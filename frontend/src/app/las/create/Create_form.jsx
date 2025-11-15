"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Create_addressInput from "./Create_addressInput";
import ProjectAddressSelector from "./ProjectAddressSelector";
import Table1 from "./Table1";
import convert from "number-to-nepali-words";
import Table2 from "./Table2";
import { Button } from "@/components/ui/button";
import Approver_address_input from "./Approver_address_input";
import Table3 from "./Table3";
import Table4 from "./Table4";
import Table5 from "./Table5";
import Table6 from "./Table6";
import Table7 from "./Table7";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Create_form = ({ onDataChange }) => {
  const [applicantType, setApplicantType] = useState("व्यक्ति");
  const [paymentFrequency, setPaymentFrequency] = useState("मासिक");
  const [isApprovalGiven, setIsApprovalGiven] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const otherRef = useRef(null);
  const formRef = useRef(null);

  // central form state derived from form fields and child components
  const [localData, setLocalData] = useState({});

  // Focus next field when pressing Enter
  const handleEnterFocus = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  }, []);

  useEffect(() => {
    // compute amount_text (words) from numeric amount when amount changes
    // guard with dependency on localData.amount to avoid running every render
    const amt = localData.amount;
    if (amt === undefined) return;

    const compute = () => {
      if (amt === "" || amt == null) return "";
      try {
        // try calling the imported convert function if available
        const cleaned = Number(String(amt).replace(/,/g, ""));
        if (typeof convert === "function") {
          // try common signatures; if these fail we'll catch and fallback
          try {
            return convert(cleaned, "toNpWord", "currency");
          } catch (_) {
            return convert(cleaned);
          }
        }
        return String(amt);
      } catch (e) {
        return String(amt);
      }
    };

    const words = compute();
    if (words !== localData.amount_text) {
      setLocalData((d) => ({ ...d, amount_text: words }));
    }
    // only run when the numeric amount changes
  }, [localData.amount]);

  // Focus the other input if "अन्य" is selected
  useEffect(() => {
    if (applicantType === "अन्य") {
      setTimeout(() => {
        otherRef.current?.focus();
      }, 100);
    }
  }, [applicantType]);

  // disable blocks when applicant is 'व्यक्ति'
  const isPerson = applicantType === "व्यक्ति";

  // helper: read form inputs using FormData and push into localData
  const readFormToObject = () => {
    const obj = {};
    if (!formRef.current) return obj;
    const fd = new FormData(formRef.current);
    for (const [k, v] of fd.entries()) {
      obj[k] = v;
    }
    // include controlled dropdowns
    obj.applicantType = applicantType;
    obj.paymentFrequency = paymentFrequency;
    return obj;
  };

  // notify parent whenever local form values change
  const prevPayloadRef = useRef(null);
  useEffect(() => {
    const combined = { ...localData, ...readFormToObject() };
    // stringify for simple deep-equality check; avoids repeatedly calling parent setState with identical data
    let serialized;
    try {
      serialized = JSON.stringify(combined);
    } catch (e) {
      // fallback: use simple reference if serialization fails
      serialized = String(combined);
    }

    if (prevPayloadRef.current !== serialized) {
      prevPayloadRef.current = serialized;
      if (onDataChange) onDataChange(combined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localData, applicantType, paymentFrequency]);

  return (
    <div className="pt-10 px-10 pb-0">
      <form ref={formRef}>
        {/* ---------------------- Section 1 ---------------------------- */}
        <div className="flex flex-row items-center gap-x-10 justify-between">
          <div className="w-full">
            <Label htmlFor="rn1">ऋण मागपत्र दर्ता संख्या</Label>
            <Input id="rn1" name="rn1" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, rn1: e.target.value }))} />
          </div>

          <div className="w-full">
            <Label htmlFor="rn2">ऋण संख्या</Label>
            <Input id="rn2" name="rn2" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, rn2: e.target.value }))} />
          </div>

          <div className="w-full">
            <Label htmlFor="rn3">ऋण मागपत्र दर्ता मिति</Label>
            <Input id="rn3" name="rn3" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, rn3: e.target.value }))} />
          </div>

          <div className="w-full">
            <Label htmlFor="rn4">दर्ता गर्नेको दस्तखत</Label>
            <Input id="rn4" name="rn4" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, rn4: e.target.value }))} />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 1, Section 2</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* ---------------------- Section 2 ---------------------------- */}
        <div className="flex flex-row items-center gap-x-10 justify-between">
          <div className="w-full">
            <Label className={localErrors.branch && "text-red-600"} htmlFor="branch">
              शाखा
            </Label>
            <Input
              id="branch"
              name="branch"
              className="w-full mt-2"
              onKeyDown={handleEnterFocus}
              onChange={(e) => {
                const val = e.target.value;
                setLocalData((d) => ({ ...d, branch: val }));
                if (!val) {
                  setLocalErrors((prev) => ({ ...prev, branch: true }));
                } else {
                  setLocalErrors((prev) => ({ ...prev, branch: false }));
                }
              }}
            />
          </div>

          <div className="w-full">
            <Label className={localErrors.desc1 && "text-red-600"} htmlFor="desc1">
              कृपया निम्न विवरण खुलाइ म/हामीले
            </Label>
            <Input
              id="desc1"
              name="desc1"
              className="w-full mt-2"
              onKeyDown={handleEnterFocus}
              onChange={(e) => {
                const val = e.target.value;
                setLocalData((d) => ({ ...d, desc1: val }));
                if (val.length < 15) {
                  setLocalErrors((prev) => ({ ...prev, desc1: true }));
                } else {
                  setLocalErrors((prev) => ({ ...prev, desc1: false }));
                }
              }}
            />
          </div>

          <div className="w-full">
            <Label className={localErrors.amount && "text-red-600"} htmlFor="amount">
              कार्यको लागि माग गरिएको रकम रु
            </Label>
            <Input
              id="amount"
              name="amount"
              className="w-full mt-2"
              onKeyDown={handleEnterFocus}
              onChange={(e) => {
                const val = e.target.value;
                setLocalData((d) => ({ ...d, amount: e.target.value }));
                if (val >= 1000000 || val == 0) {
                  setLocalErrors((prev) => ({ ...prev, amount: true }));
                } else {
                  setLocalErrors((prev) => ({ ...prev, amount: false }));
                }
              }}
            />
          </div>

          <div className="w-full cursor-default ">
            <Label htmlFor="amount_text">अक्षरेपी रु</Label>
            {/* show computed amount in words; make readOnly so it's always derived from numeric amount */}
            <Input id="amount_text" name="amount_text" className="w-full mt-2 text-gray-500" value={localData.amount_text + " मात्र /-" || ""} readOnly />
          </div>
        </div>
        {/* Divider */}
        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 1, Section 3</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        <div className="flex flex-row items-start gap-x-10 justify-between">
          <div className="w-[30%]">
            <span className=" font-semibold">व्यक्तिगत जानकारी</span>
            <div className=" mt-6">
              <Label className={localErrors.applicant_name && "text-red-600"} htmlFor="applicant_name">
                ऋण निवेदकको नाम, थर
              </Label>
              <Input
                id="applicant_name"
                name="applicant_name"
                className="w-full mt-2"
                onKeyDown={handleEnterFocus}
                onChange={(e) => {
                  const val = e.target.value;
                  const spaceCount = (val.match(/ /g) || []).length;
                  setLocalData((d) => ({ ...d, applicant_name: e.target.value }));
                  if (val.length < 8 || val.length > 70 || spaceCount > 3) {
                    setLocalErrors((prev) => ({ ...prev, applicant_name: true }));
                  } else {
                    setLocalErrors((prev) => ({ ...prev, applicant_name: false }));
                  }
                }}
              />
            </div>

            {/* Age */}
            <div className="mt-5">
              <Label className={localErrors.age ? "text-red-600" : ""} htmlFor="age">
                उमेर
              </Label>
              <Input
                id="age"
                name="age"
                className="mt-2"
                onKeyDown={handleEnterFocus}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setLocalData((d) => ({ ...d, age: val }));
                  setLocalErrors((prev) => ({ ...prev, age: val < 18 }));
                }}
              />
            </div>

            {/* Phone 1 */}
            <div className="w-full mt-5">
              <Label className={localErrors.phone1 ? "text-red-600" : ""} htmlFor="phone1">
                फोन नं १
              </Label>
              <Input
                id="phone1"
                name="phone1"
                className="w-full mt-2"
                onKeyDown={handleEnterFocus}
                onChange={(e) => {
                  const val = e.target.value;
                  setLocalData((d) => ({ ...d, phone1: val }));
                  setLocalErrors((prev) => ({ ...prev, phone1: val.length !== 10 }));
                }}
              />
            </div>

            {/* Phone 2 */}
            <div className="w-full mt-5">
              <Label className={localErrors.phone2 ? "text-red-600" : ""} htmlFor="phone2">
                फोन नं २
              </Label>
              <Input
                id="phone2"
                name="phone2"
                className="w-full mt-2"
                onKeyDown={handleEnterFocus}
                onChange={(e) => {
                  const val = e.target.value;
                  setLocalData((d) => ({ ...d, phone2: val }));
                  setLocalErrors((prev) => ({ ...prev, phone2: val.length !== 10 }));
                }}
              />
            </div>

            {/* Educational Qualification */}
            <div className="w-full mt-5">
              <Label className={localErrors.personal_education ? "text-red-600" : ""} htmlFor="personal_education">
                शैक्षिक योग्यता
              </Label>
              <Select
                value={localData.personal_education || ""}
                onValueChange={(val) => {
                  setLocalData((d) => ({ ...d, personal_education: val }));
                  setLocalErrors((prev) => ({ ...prev, personal_education: val === "" }));
                }}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="-- चयन गर्नुहोस् --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Na padheko">ना पढेको</SelectItem>
                  <SelectItem value="1-7">१-७</SelectItem>
                  <SelectItem value="8-9">८-९</SelectItem>
                  <SelectItem value="10">१०</SelectItem>
                  <SelectItem value="+2">+२</SelectItem>
                  <SelectItem value="Bachelor">स्नातक</SelectItem>
                  <SelectItem value="Master">स्नातकोत्तर</SelectItem>
                  <SelectItem value="PhD">डाक्टर/PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Create_addressInput localErrors={localErrors} setLocalErrors={setLocalErrors} onAddressChange={useCallback((addr) => setLocalData((d) => ({ ...d, address: addr })), [])} />
        </div>

        {/* Divider */}
        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 1, Section 4</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        <div className="flex flex-row items-center gap-x-10 justify-between">
          {/* Dropdown Applicant Type */}

          <div className="min-w-fit">
            <Label className={"min-w-fit"}>ऋण निवेदकको प्रकार</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="mt-2 border px-3 py-2 text-sm rounded-md w-full">{applicantType}</DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={applicantType} onValueChange={setApplicantType}>
                  <DropdownMenuRadioItem value="व्यक्ति">व्यक्ति</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="एकलौटी फर्म">एकलौटी फर्म</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="साझेदारी फर्म">साझेदारी फर्म</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="कम्पनी">कम्पनी</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="अन्य">अन्य</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {applicantType === "अन्य" && (
              <Input ref={otherRef} name="applicantType_other" placeholder="कृपया उल्लेख गर्नुहोस्" className="w-full mt-3" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, applicantType_other: e.target.value }))} />
            )}
          </div>
          <div className="w-full flex flex-row space-x-5">
            <div className="w-1/2 space-y-5">
              <div className="w-full">
                <Label className={` ${isPerson && "text-gray-500"}`} htmlFor={`"companyName `}>
                  फर्म/कम्पनीको नाम
                </Label>
                <Input id="companyName" name="companyName" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, companyName: e.target.value }))} disabled={isPerson} />
              </div>
              <div className="w-full">
                <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="shareholderNumber">
                  शेयर सदस्य नं.
                </Label>
                <Input id="shareholderNumber" name="shareholderNumber" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, shareholderNumber: e.target.value }))} disabled={isPerson} />
              </div>
              <div className="w-full">
                <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="registrationOffice">
                  रजिष्ट्रेशन गर्ने कार्यालयको नाम
                </Label>
                <Input id="registrationOffice" name="registrationOffice" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, registrationOffice: e.target.value }))} disabled={isPerson} />
              </div>
              <div className="w-full">
                <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="savingsAccountNumber">
                  बचत खाता नं.
                </Label>
                <Input id="savingsAccountNumber" name="savingsAccountNumber" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, savingsAccountNumber: e.target.value }))} disabled={isPerson} />
              </div>
            </div>

            <div className="w-1/2 space-y-5">
              <div className="w-full">
                <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="registrationNumber">
                  रजिष्ट्रेशन नं.
                </Label>
                <Input id="registrationNumber" name="registrationNumber" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, registrationNumber: e.target.value }))} disabled={isPerson} />
              </div>
              <div className="w-full">
                <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="registrationDate">
                  रजिष्ट्रेशन मिति
                </Label>
                <Input id="registrationDate" name="registrationDate" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, registrationDate: e.target.value }))} disabled={isPerson} />
              </div>
              <div className="w-full">
                <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="panNumber">
                  आयकर आ/स्थ नं. (PAN)
                </Label>
                <Input id="panNumber" name="panNumber" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, panNumber: e.target.value }))} disabled={isPerson} />
              </div>
              <div className="w-full">
                <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="panDate">
                  आयकर आ/स्थ नं. (PAN) मिति
                </Label>
                <Input id="panDate" name="panDate" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, panDate: e.target.value }))} disabled={isPerson} />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-row items-center justify-between mt-5 space-x-5">
          <div className=" w-full mt-5">
            <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="business_type">
              व्यापारको प्रकार
            </Label>
            <Input id="business_type" name="business_type" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, business_type: e.target.value }))} disabled={isPerson} />
          </div>
          <ProjectAddressSelector disabled={isPerson} handleEnterFocus={handleEnterFocus} onProjectChange={useCallback((val) => setLocalData((d) => ({ ...d, projectAddress: val })), [])} />
          <div className="w-full mt-5">
            <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="project_estimated_cost">
              परियोजनाको अनुमानित कुल लागत
            </Label>
            <Input id="project_estimated_cost" name="project_estimated_cost" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, project_estimated_cost: e.target.value }))} disabled={isPerson} />
          </div>
          <div className="w-full mt-5">
            <Label className={` ${isPerson && "text-gray-500"}`} htmlFor="project_estimated_cost_text">
              परियोजनाको अनुमानित कुल लागत (अक्षरेपी)
            </Label>
            <Input
              id="project_estimated_cost_text"
              name="project_estimated_cost_text"
              className="w-full mt-2"
              onKeyDown={handleEnterFocus}
              onChange={(e) => setLocalData((d) => ({ ...d, project_estimated_cost_text: e.target.value }))}
              disabled={isPerson}
            />
          </div>
          <div className="min-w-fit mt-5">
            <Label className="min-w-fit">व्याज बुझाउने</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="mt-2 border px-3 py-2 rounded-md w-full text-sm">{paymentFrequency || "भुक्तानी अवधि चयन गर्नुहोस्"}</DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={paymentFrequency} onValueChange={setPaymentFrequency}>
                  <DropdownMenuRadioItem value="मासिक">मासिक</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="त्रैमासिक">त्रैमासिक</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>
          <Table1 amount={localData.amount} applicantType={applicantType} onDataChange={useCallback((rows) => setLocalData((d) => ({ ...d, table1: rows })), [])} />
        </div>

        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 2, Section 1</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        <span className="font-bold">ऋणीको व्यक्तिगत विवरण</span>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-row space-x-5">
            <div className="w-full mt-5">
              <Label htmlFor="applicant_name">नाम</Label>
              <Input id="applicant_name" className="w-full mt-2" value={localData.applicant_name} onKeyDown={handleEnterFocus} disabled />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="address">ठेगाना</Label>
              <Input id="address" className="w-full mt-2" value={`${localData?.address?.permanent?.province}, ${localData?.address?.permanent?.district}, ${localData?.address?.permanent?.wada}, ${localData?.address?.permanent?.tole}`} disabled />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="citizenship_number">नागरिकता न</Label>
              <Input id="citizenship_number" name="citizenship_number" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, citizenship_number: e.target.value }))} />
            </div>
          </div>

          <div className="flex flex-row space-x-5">
            <div className="w-full mt-5">
              <Label htmlFor="applicant_father_name">बाबुको नाम</Label>
              <Input id="applicant_father_name" name="applicant_father_name" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, applicant_father_name: e.target.value }))} />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="applicant_spouse_name">पतिको/पत्नीको नाम</Label>
              <Input id="applicant_spouse_name" name="applicant_spouse_name" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, applicant_housewife_name: e.target.value }))} />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="applicant_inlaws_name">बाजे/ससुराको नाम</Label>
              <Input id="applicant_inlaws_name" name="applicant_inlaws_name" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, applicant_baje_or_sasura_name: e.target.value }))} />
            </div>
          </div>
        </div>
        <Table2 onDataChange={useCallback((newRows) => setLocalData((d) => ({ ...d, table2: newRows })), [])} />
        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 2, Section 2</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        <div className=" ">
          <div className="flex flex-row items-center justify-between">
            <p className=" font-bold">धितो मन्जुरीनामा दिनका व्यक्तिगत विवरण</p>
            <div className=" flex flex-row gap-x-1.5">
              <Button variant={"outline"} onClick={() => setIsApprovalGiven(!isApprovalGiven)} type="button">
                स्वीकृति दिइने {isApprovalGiven ? "छ " : "छैन"} ।
              </Button>
            </div>
          </div>
          {/* Row 1 */}
          <div className="flex flex-row space-x-5">
            <div className="w-full mt-5">
              <Label htmlFor="approver_applicant_name">नाम</Label>
              <Input
                id="approver_applicant_name"
                name="approver_applicant_name"
                className="w-full mt-2"
                value={localData.approver_applicant_name || ""}
                onKeyDown={handleEnterFocus}
                onChange={(e) => setLocalData((d) => ({ ...d, applicant_name: e.target.value }))}
              />
            </div>
            <div className="w-full ">
              <Approver_address_input onApproverChange={useCallback((val) => setLocalData((d) => ({ ...d, approverAddress: val })), [])} />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="citizenship_number">नागरिकता नम्बर</Label>
              <Input
                id="approver_citizenship_number"
                name="approver_citizenship_number"
                className="w-full mt-2"
                value={localData.approver_citizenship_number || ""}
                onKeyDown={handleEnterFocus}
                onChange={(e) => setLocalData((d) => ({ ...d, approver_citizenship_number: e.target.value }))}
              />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="aprover_father_name">बुबाको नाम</Label>
              <Input
                id="aprover_father_name"
                name="aprover_father_name"
                className="w-full mt-2"
                value={localData.aprover_father_name || ""}
                onKeyDown={handleEnterFocus}
                onChange={(e) => setLocalData((d) => ({ ...d, aprover_father_name: e.target.value }))}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-row space-x-5">
            <div className="w-full mt-5">
              <Label htmlFor="approver_spouse_name">पतिको/पत्नीको नाम</Label>
              <Input
                id="approver_spouse_name"
                name="approver_spouse_name"
                className="w-full mt-2"
                value={localData.approver_spouse_name || ""}
                onKeyDown={handleEnterFocus}
                onChange={(e) => setLocalData((d) => ({ ...d, approver_spouse_name: e.target.value }))}
              />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="approver_inlaws_name">हजुरबा/हजुरआमाको नाम</Label>
              <Input
                id="approver_inlaws_name"
                name="approver_inlaws_name"
                className="w-full mt-2"
                value={localData.approver_inlaws_name || ""}
                onKeyDown={handleEnterFocus}
                onChange={(e) => setLocalData((d) => ({ ...d, approver_inlaws_name: e.target.value }))}
              />
            </div>
            <div className="w-full mt-5">
              <Label htmlFor="approver_families_details">परिवारका आफन्तहरूको विवरण</Label>
              <Input
                id="approver_families_details"
                name="approver_families_details"
                className="w-full mt-2"
                value={localData.approver_families_details || ""}
                onKeyDown={handleEnterFocus}
                onChange={(e) => setLocalData((d) => ({ ...d, approver_families_details: e.target.value }))}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 2, Section 3</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        <div>
          <div className="w-full mt-5">
            <Label htmlFor="applicant_profession">ऋणीको पेशा</Label>
            <Input id="applicant_profession" name="applicant_profession" className="w-full mt-2" onKeyDown={handleEnterFocus} onChange={(e) => setLocalData((d) => ({ ...d, applicant_profession: e.target.value }))} />
          </div>
          <Table3 handleEnterFocus={handleEnterFocus} onDataChange={useCallback((newRows) => setLocalData((d) => ({ ...d, table3: newRows })), [])} />
        </div>
        <div className="flex items-center my-10">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-4 text-sm text-gray-700">Page 3, Section 1</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        <div>
          <Table4 handleEnterFocus={handleEnterFocus} onDataChange={useCallback((newRows) => setLocalData((d) => ({ ...d, table4: newRows })), [])} />
          <Table5 handleEnterFocus={handleEnterFocus} onDataChange={useCallback((newRows) => setLocalData((d) => ({ ...d, table5: newRows })), [])} />
          <Table6 handleEnterFocus={handleEnterFocus} onDataChange={useCallback((newRows) => setLocalData((d) => ({ ...d, table6: newRows })), [])} />
          <Table7 handleEnterFocus={handleEnterFocus} onDataChange={useCallback((newRows) => setLocalData((d) => ({ ...d, table7: newRows })), [])} />
        </div>
      </form>
    </div>
  );
};

export default Create_form;
