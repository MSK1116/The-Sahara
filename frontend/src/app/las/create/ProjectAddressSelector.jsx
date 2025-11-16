"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdDelete } from "react-icons/md";

import Province1JSON from "../create/Province1.json";
import Province2JSON from "../create/Province2.json";
import Province3JSON from "../create/Province3.json";
import Province4JSON from "../create/Province4.json";
import Province5JSON from "../create/Province5.json";
import Province6JSON from "../create/Province6.json";
import Province7JSON from "../create/Province7.json";
import React, { useState, useEffect } from "react";

const allProvinces = [Province1JSON, Province2JSON, Province3JSON, Province4JSON, Province5JSON, Province6JSON, Province7JSON];

export default function ProjectAddressSelector({ handleEnterFocus, onProjectChange, disabled = false, initialData }) {
  const [selected, setSelected] = useState(
    initialData || {
      province: "",
      district: "",
      palika: "",
      wada: "",
      tole: "",
    }
  );
  const [step, setStep] = useState("province"); // province -> district -> palika -> wada/tole

  const getDistricts = (provinceName) => allProvinces.find((p) => p.name === provinceName)?.districts || [];
  const getPalikas = (provinceName, districtName) => getDistricts(provinceName).find((d) => d.name === districtName)?.palikas || [];

  const resetStepFrom = (level) => {
    if (level === "province") setSelected({ province: "", district: "", palika: "", wada: "", tole: "" });
    if (level === "district") setSelected({ ...selected, district: "", palika: "", wada: "", tole: "" });
    if (level === "palika") setSelected({ ...selected, palika: "", wada: "", tole: "" });
  };

  const displayText = () => {
    // Only show selected parts
    const parts = [selected.province, selected.district, selected.palika, selected.wada, selected.tole].filter(Boolean);
    return parts.length ? parts.join(", ") : "प्रदेश चयन गर्नुहोस्";
  };

  useEffect(() => {
    if (onProjectChange) onProjectChange(selected);
  }, [selected, onProjectChange]);

  return (
    <div className="w-full mt-5">
      <Label className={`${disabled && "text-gray-500"}`}>परियोजना स्थलः</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full text-left mt-2" disabled={disabled}>
            {displayText()}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-72 flex flex-col space-y-3">
          <Button
            variant="destructive"
            className="justify-start text-sm"
            onClick={() => {
              setSelected({ province: "", district: "", palika: "", wada: "", tole: "" });
              setStep("province");
            }}
            disabled={disabled}>
            <MdDelete className=" size-5" /> Clear
          </Button>
          {/* Province Selection */}
          {step === "province" && (
            <div className="flex flex-col space-y-2">
              {allProvinces.map((p) => (
                <Button
                  key={p.name}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setSelected({ province: p.name, district: "", palika: "", wada: "", tole: "" });
                    setStep("district");
                  }}
                  disabled={disabled}>
                  {p.name}
                </Button>
              ))}
            </div>
          )}

          {/* District Selection */}
          {step === "district" && (
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="justify-start text-sm"
                onClick={() => {
                  setStep("province");
                  resetStepFrom("province");
                }}>
                ⬅ Back to Province
              </Button>
              {getDistricts(selected.province).map((d) => (
                <Button
                  key={d.name}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setSelected({ ...selected, district: d.name, palika: "", wada: "", tole: "" });
                    setStep("palika");
                  }}
                  disabled={disabled}>
                  {d.name}
                </Button>
              ))}
            </div>
          )}

          {/* Palika Selection */}
          {step === "palika" && (
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="justify-start text-sm"
                onClick={() => {
                  setStep("district");
                  resetStepFrom("district");
                }}>
                ⬅ Back to District
              </Button>
              {getPalikas(selected.province, selected.district).map((p) => (
                <Button
                  key={p}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setSelected({ ...selected, palika: p });
                    setStep("wada");
                  }}
                  disabled={disabled}>
                  {p}
                </Button>
              ))}
            </div>
          )}

          {/* Wada / Tole Inputs */}
          {step === "wada" && (
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start text-sm" onClick={() => setStep("palika")} disabled={disabled}>
                ⬅ Back to Palika
              </Button>
              <Input placeholder="वडा नं" value={selected.wada} onChange={(e) => setSelected({ ...selected, wada: e.target.value })} onKeyDown={handleEnterFocus} disabled={disabled} />
              <Input placeholder="टोल / बाटो" value={selected.tole} onChange={(e) => setSelected({ ...selected, tole: e.target.value })} onKeyDown={handleEnterFocus} disabled={disabled} />
              <Button variant="outline" onClick={() => setStep("province")} disabled={disabled}>
                Finish
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
