import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHttp } from "../../hook/useHttp";
import { nanoid } from "@reduxjs/toolkit";
import { newsCreated } from "../NewsList/news_slice";
import "./NewsAddForm.css";

function NewsAddForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { request } = useHttp();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newNews = { id: nanoid(), name, description, category };
    request("http://localhost:3001/news", "POST", JSON.stringify(newNews))
      .then(dispatch(newsCreated(newNews)))
      .catch((err) => console.log(err));
    setName("");
    setCategory("");
    setDescription("");
  };

  const { filters, filterLoadingStatus } = useSelector((state) => state.filter);

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>Loading filters</option>;
    } else if (status === "error") {
      return <option>Options loading failed, try again</option>;
    }

    if (filters && filters.length) {
      return filters.map(({ label, name }) => {
        if (label === "All") return "";
        return (
          <option key={name} value={label}>
            {label}
          </option>
        );
      });
    }
  };

  const filterElements = renderFilters(filters, filterLoadingStatus);

  return (
    <form
      onSubmit={(e) => {
        onSubmitHandler(e);
      }}
      className="border p-4 shadow-light rounded"
    >
      <div className="mb-3">
        <label className="form-label fs-4 text-white" htmlFor="name">
          Name for News
        </label>
        <input
          autoComplete="off"
          type="text"
          required
          name="name"
          className="form-control"
          id="name"
          placeholder="Enter name of News"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fs-4 text-white" htmlFor="text">
          Description
        </label>
        <textarea
          type="text"
          required
          name="description"
          className="form-control"
          id="text"
          placeholder="Description"
          style={{ height: "120px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-white" htmlFor="category">
          Choose category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="form-select"
          id="category"
          name="category"
        >
          <option>News about...</option>
          {filterElements}
        </select>
      </div>
      <button
        style={{ backgroundColor: "#FFCA2C" }}
        className="btn  w-100 text-white"
        type="submit"
      >
        Post News
      </button>
    </form>
  );
}

export default NewsAddForm;
