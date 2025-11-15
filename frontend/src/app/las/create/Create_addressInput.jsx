"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import Province1JSON from "../create/Province1.json";
import Province2JSON from "../create/Province2.json";
import Province3JSON from "../create/Province3.json";
import Province4JSON from "../create/Province4.json";
import Province5JSON from "../create/Province5.json";
import Province6JSON from "../create/Province6.json";
import Province7JSON from "../create/Province7.json";
import { Checkbox } from "@/components/ui/checkbox";

const allProvinces = [Province1JSON, Province2JSON, Province3JSON, Province4JSON, Province5JSON, Province6JSON, Province7JSON];

const Create_addressInput = ({ onAddressChange }) => {
  const [permanent, setPermanent] = useState({
    province: "",
    district: "",
    palika: "",
    wada: "",
    tole: "",
  });

  const [current, setCurrent] = useState({
    province: "",
    district: "",
    palika: "",
    wada: "",
    tole: "",
  });

  // inform parent of address changes
  React.useEffect(() => {
    if (onAddressChange) onAddressChange({ permanent, current });
  }, [permanent, current, onAddressChange]);

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

  const fillCurrentWithDash = () => {
    setCurrent({
      province: "-",
      district: "-",
      palika: "-",
      wada: "-",
      tole: "-",
    });
  };

  return (
    <div className="w-full flex flex-row space-x-6">
      {/* Permanent Address */}
      <div className="w-1/2 space-y-5">
        <span className="font-semibold my-5">स्थायी ठेगाना</span>

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
          <Label>वडा नं</Label>
          <Input className="w-full mt-2" value={permanent.wada} onChange={(e) => setPermanent({ ...permanent, wada: e.target.value })} onKeyDown={handleEnterFocus} />
        </div>

        {/* Tole */}
        <div>
          <Label>टोल / बाटो</Label>
          <Input className="w-full mt-2" value={permanent.tole} onChange={(e) => setPermanent({ ...permanent, tole: e.target.value })} onKeyDown={handleEnterFocus} />
        </div>
      </div>

      {/* Current Address */}

      <div className="w-1/2 space-y-5">
        <div className="flex items-center justify-between space-x-3 my-2">
          <span className="font-semibold">हाल बसोबास गरेको ठेगाना</span>
          <div className="text-xs space-x-2 flex items-center justify-center">
            <span className="font-semibold">स्थायी जस्तो भए</span>
            <Checkbox
              checked={current.sameAsPermanent || false}
              onCheckedChange={(checked) => {
                if (checked) {
                  setCurrent({
                    province: "-",
                    district: "-",
                    palika: "-",
                    wada: "-",
                    tole: "-",
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
          <Label>वडा नं</Label>
          <Input className="w-full mt-2" value={current.wada} disabled={current.sameAsPermanent} onChange={(e) => setCurrent({ ...current, wada: e.target.value })} onKeyDown={handleEnterFocus} />
        </div>

        {/* Tole */}
        <div>
          <Label>टोल / बाटो</Label>
          <Input className="w-full mt-2" value={current.tole} disabled={current.sameAsPermanent} onChange={(e) => setCurrent({ ...current, tole: e.target.value })} onKeyDown={handleEnterFocus} />
        </div>
      </div>
    </div>
  );
};

export default Create_addressInput;
