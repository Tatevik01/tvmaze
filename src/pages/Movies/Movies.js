import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./movies.module.scss";
import Pagination from "react-hooks-paginator";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Movies() {
  const pageLimit = 20;
  const [schedule, setSchedule] = useState(NaN);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/schedule/full")
      .then((res) => {
        setSchedule(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (schedule) {
      setCurrentData(schedule.slice(offset, offset + pageLimit));
    }
  }, [offset, schedule]);

  return (
    <>
      {schedule ? (
        <div className={styles.container}>
          <div className={styles.movies_block}>
            {currentData.map((movie, i) => {
              const img = movie._embedded.show.image
                ? movie._embedded.show.image.medium
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
              const name = movie._embedded.show.name;
              const rate = movie._embedded.show.rating.average
                ? movie._embedded.show.rating.average
                : 0;
              const premier = movie._embedded.show.premiered;
              return (
                <Link
                  key={i}
                  to={"/movie/" + movie._embedded.show.id}
                  className={styles.movie}
                >
                  <div className={styles.movie_img}>
                    <img src={img} alt="#" />
                  </div>
                  <div className={styles.movie_content}>
                    <h5>{name}</h5>
                    <Rating
                      name="half-rating-read"
                      defaultValue={rate / 2}
                      precision={0.5}
                      readOnly
                    />
                    <p>Released in {premier}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          {schedule && (
            <Pagination
              totalRecords={schedule.length}
              pageLimit={pageLimit}
              pageNeighbours={2}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageContainerClass={styles.pagination}
              pagePrevText={"<<"}
              pageNextText={">>"}
              pageActiveClass={styles.active}
            />
          )}
        </div>
      ) : (
        <div className={styles.loading_container}>
          <CircularProgress
            sx={{ margin: "auto" }}
            size="100px"
            color="inherit"
          />
        </div>
      )}
    </>
  );
}
