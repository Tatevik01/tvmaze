import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./movie.module.scss";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {movie ? (
        <div className={styles.movie_section}>
          <div className={styles.go_back_link}>
            <Link to={"/"}>
              <span>&#8592;</span> Go back
            </Link>
          </div>
          <div className={styles.movie_title_content}>
            <div className={styles.movie_img}>
              <img
                src={
                  movie.image
                    ? movie.image?.original
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                }
                alt="#"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.movie_rating}>
                <Rating
                  name="half-rating-read"
                  defaultValue={movie.rating.average / 2}
                  precision={0.5}
                  sx={{ color: "gold" }}
                />
                <p>{movie.rating.average / 2}/5 </p>
              </div>
              <h1>{movie.name}</h1>
              <div dangerouslySetInnerHTML={{ __html: movie.summary }}></div>
            </div>
          </div>
          <div className={styles.movie_content_info}>
            <div>
              <p>Premiered</p>
              <p>{movie.premiered}</p>
            </div>
            <div>
              <p>Streamed on</p>
              <p>{movie.network?.name}</p>
            </div>
            <div className={styles.schedule_days}>
              <p>Schedule</p>
              <div>
                {movie.schedule.days.map((day, i) => {
                  return (
                    <p key={i}>
                      {movie.schedule.days[movie.schedule.days.length - 1] ===
                      day
                        ? day
                        : day + ","}
                    </p>
                  );
                })}
              </div>
            </div>
            <div>
              <p>Status</p>
              <p>{movie.status}</p>
            </div>
            <div>
              <p>Country</p>
              <p>{movie.network?.country.name}</p>
            </div>
            <div>
              <p>Type</p>
              <p>{movie.type}</p>
            </div>
            <div>
              <p>Language</p>
              <p>{movie.language}</p>
            </div>
            <div>
              <p>More information</p>
              <Link to={movie.url}>{movie.url}</Link>
            </div>
          </div>
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
