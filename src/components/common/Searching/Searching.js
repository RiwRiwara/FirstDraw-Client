import React from "react";
import "./Searching.css";

export default function Searching() {
  return (
    <div className="mb-3">
      <div className="input-group rounded">
        <input
          type="search"
          className="form-control searching"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <span className="input-group-text border-0 " id="search-addon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 20 20"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </span>
      </div>

      </div>
  );
}
