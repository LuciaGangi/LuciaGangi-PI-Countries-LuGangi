import React, { useState, useEffect } from "react";
import style from "../Styles/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  orderNameAsc,
  orderNameDes,
  activityFilter,
  getAllActivities,
  getCountryName,
  regionFilter,
  clearDetail,
  orderPopAsc,
  orderPopDes,
} from "../actions/actions";

export function Header() {
  const dispatch = useDispatch();

  const activities = useSelector((state) => state.allActivities);

  const [orderN, setOrderN] = useState({
    type: "A a la Z",
  });

  const [orderP, setOrderP] = useState({
    type: "Menor",
  });

  const [name, setName] = useState("");

  const orderName = () => {
    if (orderN.type === "A a la Z") {
      dispatch(orderNameAsc());
      setOrderN({ type: "Z a la A" });
    }
    if (orderN.type === "Z a la A") {
      dispatch(orderNameDes());
      setOrderN({ type: "A a la Z" });
    }
  };

  const orderPop = () => {
    if (orderP.type === "Menor") {
      dispatch(orderPopAsc());
      setOrderP({ type: "Mayor" });
    }
    if (orderP.type === "Mayor") {
      dispatch(orderPopDes());
      setOrderP({ type: "Menor" });
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountryName(name));
    setName("");
  };

  const filter = (e) => {
    if (e.target.value === "") return dispatch(clearDetail());
    dispatch(regionFilter(e.target.value));
  };

  const filterAct = (e) => {
    if (e.target.value === "") return dispatch(clearDetail());
    dispatch(activityFilter(e.target.value));
  };

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <header className={style.navbar}>
      <div className={style.resetDiv}>
        <Link to="/">
          <button
            className={style.resetButton}
            onClick={() => dispatch(clearDetail())}
          >
            <h2>Países</h2>
          </button>
        </Link>
      </div>
      <form onSubmit={onSubmit} className={style.input}>
        <input
          className={style.searchInput}
          type="text"
          placeholder="Buscar países..."
          value={name}
          onChange={handleChange}
        ></input>
      </form>
      <div>
        <select className={style.selectbox} onChange={filter}>
          <option value="">Filtrar por continente</option>
          <option value="America">America</option>
          <option value="Europe">Europa</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antartida</option>
        </select>
        <select className={style.selectbox} onChange={filterAct}>
          <option value="">Filtrar por actividad</option>
          {activities?.map((act) => (
            <option key={act.id} value={act.name}>
              {act.name}
            </option>
          ))}
        </select>
        <button className={style.orderButton} onClick={orderName}>
          <h3>Ordenar Alfabeticamente</h3>
          <h3>{orderN.type}</h3>
        </button>
        <button className={style.orderButton} onClick={orderPop}>
          <h3>
            Buscar por población<nav></nav>
          </h3>
          <h3>{orderP.type}</h3>
        </button>
      </div>
    </header>
  );
}
