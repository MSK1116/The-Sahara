"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import React, { useState, useEffect } from "react";

import Province1JSON from "@/asset/Province1.json";
import Province2JSON from "@/asset/Province2.json";
import Province3JSON from "@/asset/Province3.json";
import Province4JSON from "@/asset/Province4.json";
import Province5JSON from "@/asset/Province5.json";
import Province6JSON from "@/asset/Province6.json";
import Province7JSON from "@/asset/Province7.json";

const allProvinces = [Province1JSON, Province2JSON, Province3JSON, Province4JSON, Province5JSON, Province6JSON, Province7JSON];

export default function MiniAddressSelector({ value, onChange, disabled = false }) {
  const [selected, setSelected] = useState(value || { province: "", district: "", palika: "", wada: "", tole: "" });

  useEffect(() => {
    setSelected(value || { province: "", district: "", palika: "", wada: "", tole: "" });
  }, [value]);

  const [step, setStep] = useState("province");

  const getDistricts = (province) => allProvinces.find((p) => p.name === province)?.districts || [];

  const getPalikas = (province, district) => getDistricts(province).find((d) => d.name === district)?.palikas || [];

  const displayText = () => {
    const parts = [selected.province, selected.district, selected.palika, selected.wada, selected.tole].filter(Boolean);

    return parts.length ? parts.join(", ") : "ठेगाना चयन गर्नुहोस्";
  };

  useEffect(() => {
    onChange && onChange(selected);
  }, [selected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button title={displayText()} variant="outline" className="w-full text-left" disabled={disabled}>
          {displayText()}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full flex flex-col space-y-2">
        <Button
          variant="destructive"
          className="justify-start text-sm"
          onClick={() => {
            setSelected({ province: "", district: "", palika: "", wada: "", tole: "" });
            setStep("province");
          }}>
          <MdDelete className="size-4" /> Clear
        </Button>

        {/* Province */}
        {step === "province" && (
          <div className="flex flex-col space-y-1">
            {allProvinces.map((p) => (
              <Button
                key={p.name}
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setSelected({ province: p.name, district: "", palika: "", wada: "", tole: "" });
                  setStep("district");
                }}>
                {p.name}
              </Button>
            ))}
          </div>
        )}

        {/* District */}
        {step === "district" && (
          <div className="flex flex-col space-y-1">
            <Button variant="ghost" className="text-sm justify-start" onClick={() => setStep("province")}>
              ⬅ Province
            </Button>

            {getDistricts(selected.province).map((d) => (
              <Button
                key={d.name}
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setSelected({ ...selected, district: d.name, palika: "", wada: "", tole: "" });
                  setStep("palika");
                }}>
                {d.name}
              </Button>
            ))}
          </div>
        )}

        {/* Palika */}
        {step === "palika" && (
          <div className="flex flex-col space-y-1">
            <Button variant="ghost" className="text-sm" onClick={() => setStep("district")}>
              ⬅ District
            </Button>

            {getPalikas(selected.province, selected.district).map((p) => (
              <Button
                key={p}
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setSelected({ ...selected, palika: p });
                  setStep("wada");
                }}>
                {p}
              </Button>
            ))}
          </div>
        )}

        {/* Wada & Tole */}
        {step === "wada" && (
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" className="text-sm" onClick={() => setStep("palika")}>
              ⬅ Palika
            </Button>

            <Input placeholder="वडा नं" value={selected.wada} onChange={(e) => setSelected({ ...selected, wada: e.target.value })} />

            <Input placeholder="टोल / बाटो" value={selected.tole} onChange={(e) => setSelected({ ...selected, tole: e.target.value })} />

            <Button variant="outline" onClick={() => setStep("province")}>
              Done
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
