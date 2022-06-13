import "./NewsFilter.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner/Spinner";
import classNames from "classnames";
import { activeFilterChanged } from "./filter_slice";
import { fecthFilters } from "./filter_slice";
// import { fecthFilters } from "../../redux/actions";

function NewsFilter() {
  const { filters, filterLoadingStatus, activeFilter } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthFilters());
    // eslint-disable-next-line
  }, []);

  if (filterLoadingStatus === "loading") {
    return <Spinner />;
  }

  const renderFilters = (arr) => {
    if (!arr.length) {
      return <h5 className="text-center text-white">Filters Not Found</h5>;
    }
    return arr.map(({ name, className, label }) => {
      const btnClass = classNames("btn", className, {
        active: label === activeFilter,
      });
      return (
        <button
          onClick={() => {
            if (activeFilter !== label) {
              dispatch(activeFilterChanged(label));
            }
          }}
          key={name}
          id={name}
          className={btnClass}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className="card border-light bg-transparent shadow-light mt-4">
      <div className="card-body">
        <p className="card-text text-white">Filter by Category</p>
        <div className="btn-group p-2 bg-transparent">{elements}</div>
      </div>
    </div>
  );
}

export default NewsFilter;
