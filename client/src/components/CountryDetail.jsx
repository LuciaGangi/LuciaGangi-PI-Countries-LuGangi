import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryDetail, clearDetail } from "../actions/actions";
import { Activity } from "../components/Activity";
import style from "../Styles/CountryDetail.module.css";

export const CountryDetail = () => {
  const countryDetail = useSelector((state) => state.countryDetail);

  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(getCountryDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  return (
    <div>
      <div className={style.container}>
        <div className={style.containerDouble}>
          <Link className={style.link} to="/home">
            <button className={style.backButton}>Volver a países</button>
          </Link>

          {countryDetail.activities?.length > 0 ? (
            <Link className={style.link} to="/Activity">
              <button className={style.backButton}>Crear otra actividad</button>
            </Link>
          ) : (
            <Link className={style.link} to="/Activity">
              <button className={style.backButton}>
                No hay actividades para este país... Vamos a crear una!
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className={style.container}>
        <div className={style.containerDouble}>
          <div>
            <img
              style={{ borderRadius: "50px" }}
              src={countryDetail.flag}
              alt="No img"
            />
          </div>
          <div>
            <h2>{countryDetail.name}</h2>
            <table className={style.table}>
              <tbody>
                <tr>
                  <td className={style.columntitle}>Código país</td>
                  <td className={style.columninfo}>{countryDetail.id}</td>
                </tr>
                <tr>
                  <td>Continente:</td>
                  <td>{countryDetail.region}</td>
                </tr>
                <tr>
                  <td>Región:</td>
                  <td>{countryDetail.subregion}</td>
                </tr>
                <tr>
                  <td>Capital:</td>
                  <td>{countryDetail.capital}</td>
                </tr>
                <tr>
                  <td>Area:</td>
                  <td>{countryDetail.area?.toLocaleString("en-US")} Km2</td>
                </tr>
                <tr>
                  <td>Población:</td>
                  <td>
                    {countryDetail.population?.toLocaleString("en-US")} Hab.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <Activity
          countryName={countryDetail.name}
          activities={countryDetail.activities}
        />
      </div>
    </div>
  );
};
