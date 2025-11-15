import React, { useState } from 'react'
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { FaCalendarAlt } from "react-icons/fa";
import { Input } from '../ui/input';

// ✅ Reusable helper for date formatting
function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ✅ Check if date is valid
function isValidDate(date) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

const DatePiker = ({ onChange, disabled }) => {

  const today = new Date();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date);
  const [value, setValue] = useState(formatDate(date));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          disabled={disabled}
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const newdate = new Date(e.target.value);
            onChange(newdate);
            setValue(formatDate(newdate));
            if (isValidDate(newdate)) {
              setDate(newdate);
              setMonth(newdate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              disabled={disabled}
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2 !p-0"
            >
              <FaCalendarAlt className="size-4 !text-primary/70" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setValue(formatDate(selectedDate));
                onChange(formatDate(selectedDate));
                setOpen(false);
              }}
              captionLayout="dropdown"
              fromYear={1970}
              toYear={2030}
              defaultMonth={date}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default DatePiker
