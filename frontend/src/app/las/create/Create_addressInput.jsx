"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import Province1JSON from "@/asset/Province1.json";
import Province2JSON from "@/asset/Province2.json";
import Province3JSON from "@/asset/Province3.json";
import Province4JSON from "@/asset/Province4.json";
import Province5JSON from "@/asset/Province5.json";
import Province6JSON from "@/asset/Province6.json";
import Province7JSON from "@/asset/Province7.json";
import { Checkbox } from "@/components/ui/checkbox";

const allProvinces = [Province1JSON, Province2JSON, Province3JSON, Province4JSON, Province5JSON, Province6JSON, Province7JSON];

const Create_addressInput = ({ onAddressChange, setLocalErrors, localErrors, initialData }) => {
  const allDistricts = allProvinces.flatMap((p) => p.districts.map((d) => d.name));

  const [permanentOld, setPermanentOld] = useState(
    initialData?.permanentOld || {
      province: "",
      district: "",
      palika: "",
      wada: "",
      tole: "",
    }
  );
  const [permanent, setPermanent] = useState(
    initialData?.permanent || {
      province: "",
      district: "",
      palika: "",
      wada: "",
      tole: "",
    }
  );
  const [current, setCurrent] = useState(
    initialData?.current || {
      province: "",
      district: "",
      palika: "",
      wada: "",
      tole: "",
    }
  );

  // inform parent of address changes
  React.useEffect(() => {
    if (onAddressChange) onAddressChange({ permanent, current });
  }, [permanentOld, permanent, current, onAddressChange]);

  const handleEnterFocus = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

  const getDistricts = (provinceName) => {
    if (!provinceName) return [];
    const province = allProvinces.find((p) => p.name === provinceName);
    return province?.districts || [];
  };

  const getPalikas = (provinceName, districtName) => {
    if (!provinceName || !districtName) return [];
    const province = allProvinces.find((p) => p.name === provinceName);
    const district = province?.districts.find((d) => d.name === districtName);
    return district?.palikas || [];
  };

  return (
    <div className="w-full flex flex-row space-x-6">
      {/* from nagrita */}
      <div className="w-1/2 space-y-5">
        <span className="font-semibold my-5">साबिक ठेगाना :</span>

        {/* District */}
        <div className="">
          <div className="mt-5">जिल्ला</div>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full text-left border px-2 py-1 rounded-md">{permanentOld.district || "जिल्ला चयन गर्नुहोस्"}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup onKeyDown={handleEnterFocus} value={permanentOld.district || ""} onValueChange={(val) => setPermanentOld({ ...permanentOld, district: val })}>
                {allDistricts.map((d, index) => (
                  <DropdownMenuRadioItem key={d + index + "57"} value={d}>
                    {d}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Palika */}
        <div>
          <Label>पालिका</Label>
          <Input value={permanentOld.palika || ""} onChange={(val) => setPermanentOld({ ...permanentOld, palika: val.target.value })}></Input>
        </div>

        {/* Wada */}
        <div>
          <Label className={localErrors?.permanentOld_wada && "text-red-600"}>वडा नं</Label>
          <Input
            className="w-full mt-2"
            value={permanent.wada}
            onChange={(e) => {
              const val = e.target.value;
              setPermanentOld({ ...permanentOld, wada: e.target.value });
              if (!val) {
                setLocalErrors((prev) => ({ ...prev, permanentOld_wada: true }));
              } else {
                setLocalErrors((prev) => ({ ...prev, permanentOld_wada: false }));
              }
            }}
            onKeyDown={handleEnterFocus}
          />
        </div>

        {/* Tole */}
        <div>
          <Label className={localErrors?.permanent_tole && "text-red-600"}>टोल / बाटो</Label>
          <Input
            className="w-full mt-2"
            value={permanent.tole}
            onChange={(e) => {
              const val = e.target.value;
              setPermanent({ ...permanent, tole: e.target.value });
              if (!val || val.length < 4 || val.length > 50) {
                setLocalErrors((prev) => ({ ...prev, permanent_tole: true }));
              } else {
                setLocalErrors((prev) => ({ ...prev, permanent_tole: false }));
              }
            }}
            onKeyDown={handleEnterFocus}
          />
        </div>
      </div>
      {/* Permanent Address */}
      <div className="w-1/2 space-y-5">
        <span className="font-semibold my-5">हाल ठेगाना</span>

        {/* Province */}
        <div className=" mt-6">
          <Label>प्रदेश</Label>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-2 border px-3 py-2 rounded-md w-full text-sm">{permanent.province || "प्रदेश चयन गर्नुहोस्"}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
              <DropdownMenuRadioGroup value={permanent.province} onValueChange={(val) => setPermanent({ ...permanent, province: val, district: "", palika: "" })}>
                {allProvinces.map((p) => (
                  <DropdownMenuRadioItem key={p.name} value={p.name}>
                    {p.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* District */}
        <div>
          <Label>जिल्ला</Label>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-2 border px-3 py-2 rounded-md w-full text-sm">{permanent.district || "जिल्ला चयन गर्नुहोस्"}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
              <DropdownMenuRadioGroup value={permanent.district} onValueChange={(val) => setPermanent({ ...permanent, district: val, palika: "" })}>
                {getDistricts(permanent.province).map((d) => (
                  <DropdownMenuRadioItem key={d.name} value={d.name}>
                    {d.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Palika */}
        <div>
          <Label>पालिका</Label>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-2 border px-3 py-2 rounded-md w-full text-sm">{permanent.palika || "पालिका चयन गर्नुहोस्"}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
              <DropdownMenuRadioGroup value={permanent.palika} onValueChange={(val) => setPermanent({ ...permanent, palika: val })}>
                {getPalikas(permanent.province, permanent.district).map((p) => (
                  <DropdownMenuRadioItem key={p} value={p}>
                    {p}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Wada */}
        <div>
          <Label className={localErrors?.permanent_wada && "text-red-600"}>वडा नं</Label>
          <Input
            className="w-full mt-2"
            value={permanent.wada}
            onChange={(e) => {
              const val = e.target.value;
              setPermanent({ ...permanent, wada: e.target.value });
              if (!val) {
                setLocalErrors((prev) => ({ ...prev, permanent_wada: true }));
              } else {
                setLocalErrors((prev) => ({ ...prev, permanent_wada: false }));
              }
            }}
            onKeyDown={handleEnterFocus}
          />
        </div>

        {/* Tole */}
        <div>
          <Label className={localErrors?.permanent_tole && "text-red-600"}>टोल / बाटो</Label>
          <Input
            className="w-full mt-2"
            value={permanent.tole}
            onChange={(e) => {
              const val = e.target.value;
              setPermanent({ ...permanent, tole: e.target.value });
              if (!val || val.length < 4 || val.length > 50) {
                setLocalErrors((prev) => ({ ...prev, permanent_tole: true }));
              } else {
                setLocalErrors((prev) => ({ ...prev, permanent_tole: false }));
              }
            }}
            onKeyDown={handleEnterFocus}
          />
        </div>
      </div>

      <div className="w-1/2 space-y-5">
        <div className="flex items-center justify-between space-x-3 my-2">
          <span className="font-semibold">बसोबास ठेगाना</span>
          <div className="text-xs space-x-2 flex items-center justify-center">
            <span className="font-semibold text-red-600">स्थायी जस्तो भए</span>
            <Checkbox
              className={""}
              checked={current.sameAsPermanent || false}
              onCheckedChange={(checked) => {
                if (checked) {
                  setCurrent({
                    ...permanent,
                    sameAsPermanent: true,
                  });
                } else {
                  setCurrent({
                    province: "",
                    district: "",
                    palika: "",
                    wada: "",
                    tole: "",
                    sameAsPermanent: false,
                  });
                }
              }}
            />
          </div>
        </div>

        {/* Province */}
        <div className=" mt-4">
          <Label>प्रदेश</Label>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="mt-2 border px-3 py-2 rounded-md w-full text-sm"
              disabled={current.sameAsPermanent} // disable trigger
            >
              {current.province || "प्रदेश चयन गर्नुहोस्"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
              <DropdownMenuRadioGroup value={current.province} onValueChange={(val) => setCurrent({ ...current, province: val, district: "", palika: "" })}>
                {allProvinces.map((p) => (
                  <DropdownMenuRadioItem key={p.name} value={p.name} disabled={current.sameAsPermanent}>
                    {p.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* District */}
        <div>
          <Label>जिल्ला</Label>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-2 border px-3 py-2 rounded-md w-full text-sm" disabled={current.sameAsPermanent}>
              {current.district || "जिल्ला चयन गर्नुहोस्"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
              <DropdownMenuRadioGroup value={current.district} onValueChange={(val) => setCurrent({ ...current, district: val, palika: "" })}>
                {getDistricts(current.province).map((d) => (
                  <DropdownMenuRadioItem key={d.name} value={d.name} disabled={current.sameAsPermanent}>
                    {d.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Palika */}
        <div>
          <Label>पालिका</Label>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-2 border px-3 py-2 rounded-md w-full text-sm" disabled={current.sameAsPermanent}>
              {current.palika || "पालिका चयन गर्नुहोस्"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
              <DropdownMenuRadioGroup value={current.palika} onValueChange={(val) => setCurrent({ ...current, palika: val })}>
                {getPalikas(current.province, current.district).map((p) => (
                  <DropdownMenuRadioItem key={p} value={p} disabled={current.sameAsPermanent}>
                    {p}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Wada */}
        <div>
          <Label className={localErrors?.current_wada && "text-red-600"}>वडा नं</Label>
          <Input
            className={`w-full mt-2 ${localErrors?.current_wada ? "border-red-500" : ""}`}
            value={current.wada}
            disabled={current.sameAsPermanent}
            onChange={(e) => {
              const val = e.target.value;
              setCurrent({ ...current, wada: val });
              if (!val) {
                setLocalErrors((prev) => ({ ...prev, current_wada: true }));
              } else {
                setLocalErrors((prev) => ({ ...prev, current_wada: false }));
              }
            }}
            onKeyDown={handleEnterFocus}
          />
        </div>

        {/* Tole */}
        <div>
          <Label className={localErrors?.current_tole && "text-red-600"}>टोल / बाटो</Label>
          <Input
            className={`w-full mt-2 ${localErrors?.current_tole ? "border-red-500" : ""}`}
            value={current.tole}
            disabled={current.sameAsPermanent}
            onChange={(e) => {
              const val = e.target.value;
              setCurrent({ ...current, tole: val });
              if (!val || val.length < 4 || val.length > 50) {
                setLocalErrors((prev) => ({ ...prev, current_tole: true }));
              } else {
                setLocalErrors((prev) => ({ ...prev, current_tole: false }));
              }
            }}
            onKeyDown={handleEnterFocus}
          />
        </div>
      </div>
    </div>
  );
};

export default Create_addressInput;
