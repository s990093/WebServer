"use clinet";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

// Interface for tag data structure
export interface TagResponse {
  id: number;
  name: string;
  directories: [
    {
      id: number;
      name: string;
      tag: number;
    }
  ];
}

export interface Props {
  tags: TagResponse[];
  onTagClick?: (tag: TagResponse) => void;
}

const TagList: React.FC<Props> = ({ tags, onTagClick }) => {
  const [tagColors, setTagColors] = useState<string[]>([]);

  useEffect(() => {
    const generateRandomColor = () => {
      const colors = ["#3182CE", "#2C5282", "#2B6CB0", "#2A4365", "#2C7A7B"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const colors = tags.map(() => generateRandomColor());
    setTagColors(colors);
  }, [tags]);

  const handleTagClick = (tag: TagResponse) => {
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <div
          key={tag.id}
          onClick={() => handleTagClick(tag)}
          className={classNames(
            "px-3 py-1 rounded-full text-white text-sm flex items-center cursor-pointer transition transform hover:scale-105 hover:shadow-lg",
            {
              "bg-blue-500": tagColors[index] === "#3182CE",
              "bg-blue-600": tagColors[index] === "#2C5282",
              "bg-blue-700": tagColors[index] === "#2B6CB0",
              "bg-blue-800": tagColors[index] === "#2A4365",
              "bg-blue-900": tagColors[index] === "#2C7A7B",
            }
          )}
          style={{ backgroundColor: tagColors[index] }}
        >
          <FontAwesomeIcon
            icon={faCircle as IconDefinition}
            className="text-white mr-2"
          />
          {tag.name}
        </div>
      ))}
    </div>
  );
};

export default TagList;
