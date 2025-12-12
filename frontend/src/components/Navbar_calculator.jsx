import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import AreaInput from "./AreaInput";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import convert from "number-to-nepali-words";

const Navbar_calculator = () => {
  const [landEvaluator, setLandEvaluator] = useState({
    land: "",
    govApprovedPrice: 0,
    localApprovedPrice: 0,
  });

  const calculateKatha = (area) => {
    if (!area) return 0;
    const parts = area.split("-").map((part) => Number(convert(part, "toEn")));
    if (parts.length === 1) return parts[0];
    if (parts.length === 4) {
      const [A, B, C, D] = parts;
      return A * 20 + B + C / 20 + D / (20 * 16);
    }
    return 0;
  };

  const grandTotal = () => {
    const katha = calculateKatha(landEvaluator.land);
    const gov = Number(landEvaluator.govApprovedPrice) || 0;
    const local = Number(landEvaluator.localApprovedPrice) || 0;
    return katha * (gov + local);
  };

  return (
    <Dialog>
      <DialogTrigger className="p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 active:scale-95 transition">
        <FaCalculator className="size-5" />
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Land Evaluator</DialogTitle>
          <DialogDescription className="text-sm">बीघा - कट्ठा - धुर - कनमा</DialogDescription>
        </DialogHeader>
        {/* AREA INPUT */}
        <div className="mt-4 flex flex-col items-center space-y-3">
          <AreaInput onChange={(val) => setLandEvaluator((d) => ({ ...d, land: val }))} value={landEvaluator.land} />
          <span className="text-xs rounded-md border bg-gray-100 px-3 py-1">{calculateKatha(landEvaluator.land).toFixed(3)} कट्ठा</span>
        </div>

        {/* PRICE SECTION */}
        <div className="mt-6 space-y-6">
          {/* Gov Price */}
          <div>
            <Label className="text-sm font-semibold">नेपाल सरकार वा निकायले तोकेको मूल्य (प्रति कट्ठा)</Label>

            <div className="mt-2 flex items-center space-x-4">
              <Slider value={[landEvaluator.govApprovedPrice]} onValueChange={(val) => setLandEvaluator((d) => ({ ...d, govApprovedPrice: val[0] }))} max={70} step={0.1} className="flex-1" />

              <Input
                max="70"
                className="w-20 text-center"
                type="number"
                step="0.1"
                value={landEvaluator.govApprovedPrice}
                onChange={(e) =>
                  setLandEvaluator((d) => ({
                    ...d,
                    govApprovedPrice: e.target.value,
                  }))
                }
              />

              <span className="text-xs whitespace-nowrap">Lakh</span>
            </div>
          </div>

          {/* Local Price */}
          <div>
            <Label className="text-sm font-semibold">चलन चल्तीको मूल्य (प्रति कट्ठा)</Label>

            <div className="mt-2 flex items-center space-x-4">
              <Slider
                value={[landEvaluator.localApprovedPrice]}
                onValueChange={(val) =>
                  setLandEvaluator((d) => ({
                    ...d,
                    localApprovedPrice: val[0],
                  }))
                }
                max={70}
                step={0.1}
                className="flex-1"
              />

              <Input
                max="70"
                className="w-20 text-center"
                type="number"
                step="0.1"
                value={landEvaluator.localApprovedPrice}
                onChange={(e) =>
                  setLandEvaluator((d) => ({
                    ...d,
                    localApprovedPrice: e.target.value,
                  }))
                }
              />

              <span className="text-xs whitespace-nowrap">Lakh</span>
            </div>
          </div>
        </div>

        {/* TOTALS */}
        <div className="mt-6 bg-gray-50 p-4 rounded-md border">
          <p className="font-semibold">
            Grand Total: <span className="text-blue-600">{grandTotal().toFixed(3)} Lakh</span>
          </p>

          <p className="text-sm mt-1">
            ५०% मार्जिन कटाई: <span className="font-semibold text-green-600">{(grandTotal() / 4).toFixed(3)} Lakh</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Navbar_calculator;
