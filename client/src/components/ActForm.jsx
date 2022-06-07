import React, { useState, useEffect } from "react";
import { postActivity } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries, clearDetail } from "../actions/actions";
import { Link } from "react-router-dom";
import { utils } from "../Utils/Utils";
import style from "../Styles/ActForm.module.css";

export function ActForm() {
  const arrDuration = [];

  for (let i = 1; i <= 24; i++) {
    let stringToTime = i;
    if (i < 10) {
      stringToTime = `0${stringToTime}:00`;
    } else {
      stringToTime += ":00";
    }
    arrDuration.push(stringToTime);
  }

  const initialInput = {
    name: "",
    duration: "",
    difficulty: "",
    season: "",
    countryID: [],
  };

  const allCountries = useSelector((state) => state.allCountries);
  const message = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    if (e.target.name === "name") {
      setErrors(utils.validate({ ...input, [e.target.name]: e.target.value }));
      setInput({ ...input, [e.target.name]: e.target.value });
    }
    if (e.target.name === "countryID") {
      let exists = input.countryID.find((c) => c === e.target.value);
      if (!exists) {
        setErrors(
          utils.validate({ ...input, [e.target.name]: e.target.value })
        );
        setInput({
          ...input,
          [e.target.name]: [...input.countryID, e.target.value],
        });
      }
    }
    if (e.target.name === "difficulty") {
      setErrors(utils.validate({ ...input, [e.target.name]: e.target.value }));
      setInput({ ...input, [e.target.name]: e.target.value });
    }
    if (e.target.name === "duration") {
      setErrors(utils.validate({ ...input, [e.target.name]: e.target.value }));
      setInput({ ...input, [e.target.name]: e.target.value });
    }
    if (e.target.name === "difficulty") {
      setErrors(utils.validate({ ...input, [e.target.name]: e.target.value }));
      setInput({ ...input, [e.target.name]: e.target.value });
    }
    if (e.target.name === "season") {
      setErrors(utils.validate({ ...input, [e.target.name]: e.target.value }));
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const delCountry = (e) => {
    let country = input.countryID.filter((c) => c !== e.target.value);
    setInput({
      ...input,
      countryID: country,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(input));
    dispatch(clearDetail());
    setInput(initialInput);
    setErrors({});
  };

  useEffect(() => {
    if (message !== null) alert(message);
  }, [message]);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <button
        className={style.backButton}
        style={{ marginBottom: "30px" }}
        onClick={() => dispatch(clearDetail())}
      >
        <Link className={style.link} to="/home">
          Volver a países
        </Link>
      </button>
      <form onSubmit={handleOnSubmit}>
        <div>
          {errors.name && <h3>{errors.name}</h3>}
          <input
            className={style.searchInput}
            name="name"
            placeholder="Crear actividad"
            value={input.name}
            onChange={handleOnChange}
            required
          ></input>
        </div>
        <div className={style.containerDouble}>
          <div>
            <select
              name="difficulty"
              value={input.difficulty}
              className={style.selectBox}
              onChange={handleOnChange}
              required
            >
              <option value="">Seleccionar dificultad</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <select
              name="duration"
              value={input.duration}
              className={style.selectBox}
              onChange={handleOnChange}
              required
            >
              <option value="">Seleccionar duración</option>
              {arrDuration.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="season"
              value={input.season}
              className={style.selectBox}
              onChange={handleOnChange}
              required
            >
              <option value="">Seleccionar estación</option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
            </select>
          </div>
          <div className={style.containerDouble}>
            <div>
              {errors.countryID && <h3>{errors.countryID}</h3>}
              <select
                name="countryID"
                value={input.countryID[input.countryID.length - 1] ?? ""}
                className={style.selectBox}
                onChange={handleOnChange}
              >
                <option value="">Seleccionar países</option>
                {allCountries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>País</th>
                    <th>Agregar</th>
                  </tr>
                </thead>
                <tbody>
                  {input.countryID &&
                    input.countryID.map((c) => (
                      <tr key={c}>
                        <td className={style.tdText}>{c}</td>
                        <td>
                          <button
                            className={style.removeButton}
                            onClick={delCountry}
                            value={c}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          {utils.objTester(errors) ? (
            <h3>Completar datos para Agregar</h3>
          ) : (
            <button className={style.lightButton} type="submit">
              Agregar Actividad
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
