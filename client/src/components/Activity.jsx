import React from "react";
import style from "../Styles/Activity.module.css";

export const Activity = ({ activities, countryName }) => {
  return (
    <div>
      <h3>Actividades planeadas en {countryName}</h3>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Duración (horas)</th>
            <th>Estación</th>
            <th>Dificultad</th>
          </tr>
        </thead>
        <tbody>
          {activities &&
            activities.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.duration}</td>
                <td>{a.season}</td>
                <td>{a.difficulty}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
