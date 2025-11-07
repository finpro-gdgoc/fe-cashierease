import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StatsCompoHeader({ title, date, options, setHour }) {
  return (
    <div className="flex justify-between py-1 ">
      <p className="text-lg font-semibold">{title}</p>
      <Select onValueChange={(e) => setHour(e)}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder={date} />
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(options) &&
            options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
