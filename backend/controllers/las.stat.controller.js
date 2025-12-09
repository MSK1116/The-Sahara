import getLasModel from "../models/las.model.js";
import convert from "number-to-nepali-words";
export const getAppPerDay = async (req, res) => {
  try {
    const { databaseSlug } = req.body;
    if (!databaseSlug) {
      return res.status(400).json({ message: "databaseSlug required" });
    }

    const LasModel = getLasModel(databaseSlug);

    const rawCreated = await LasModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const rawUpdated = await LasModel.aggregate([
      {
        $match: { updatedAt: { $gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) } },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const fillMissingDays = (data) => {
      const today = new Date();
      const map = new Map(data.map((d) => [d._id, d.count]));
      const result = [];

      for (let i = 13; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const key = date.toISOString().substring(0, 10);

        result.push({
          date: key,
          count: map.get(key) || 0,
        });
      }
      return result;
    };

    const dailyCreated = fillMissingDays(rawCreated);
    const dailyUpdated = fillMissingDays(rawUpdated);

    const allDocs = await LasModel.find({}, { "form1.amount": 1 }).lean();
    const amounts = allDocs.map((doc) => parseFloat(convert(doc.form1?.amount || "", "toEn")) || 0);

    const loanStats = {
      totalAmount: amounts.reduce((a, b) => a + b, 0),
      avgAmount: amounts.length ? amounts.reduce((a, b) => a + b, 0) / amounts.length : 0,
      minAmount: amounts.length ? Math.min(...amounts) : 0,
      maxAmount: amounts.length ? Math.max(...amounts) : 0,
    };

    const topProfessions = await LasModel.aggregate([
      {
        $group: {
          _id: "$form1.applicant_profession",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const totalDocs1 = await LasModel.countDocuments();
    const topCount1 = topProfessions.reduce((sum, p) => sum + p.count, 0);
    if (topCount1 < totalDocs1) {
      topProfessions.push({ _id: "Other", count: totalDocs1 - topCount1 });
    }

    const topEducation = await LasModel.aggregate([
      {
        $group: {
          _id: "$form1.personal_education",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const totalDocs2 = await LasModel.countDocuments();
    const topCount2 = topEducation.reduce((sum, e) => sum + e.count, 0);
    if (topCount2 < totalDocs2) {
      topEducation.push({ _id: "Other", count: totalDocs2 - topCount2 });
    }

    return res.status(200).json({
      dailyCreated,
      dailyUpdated,
      loanStats,
      topProfessions,
      topEducation,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
