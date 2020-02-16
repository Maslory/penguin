import React from "react";
import "../style/style.sass";
import { connect } from "react-redux";
import { request, changeId } from "./actions/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = (props: any) => {
  useEffect(() => {
    if (!props.boolean) {
      requestArray(true);
    }
  });

  const requestArray = (bool: boolean) => {
    props.request(bool);
  };

  return (
    <div className="home_page">
      <ul className="users">
        {props.array_users.length >= 1 ? (
          props.array_users.map(
            (
              elem: {
                id: any;
                name: string;
                email: string;
                company: { name: string };
                address: {
                  street: string;
                  suite: string;
                  city: string;
                  zipcode: React.ReactNode;
                };
              },
              key: number
            ) => (
              <li key={key} className="user">
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    <Link
                      onClick={event =>
                        props.selectId(
                          event.currentTarget.getAttribute("id"),
                          event.currentTarget.textContent
                        )
                      }
                      to="/todocase"
                      id={elem.id}
                      className="username"
                    >
                      {elem.name}
                    </Link>{" "}
                  </span>{" "}
                  <br />
                  <div className="user_info">
                    <b>Почта: </b>
                    <span>{elem.email}</span> <br />
                    <b>Компания: </b>
                    <span>{elem.company.name}</span> <br />
                    <b>Адрес: </b>
                    <span>
                      {" "}
                      {elem.address.street} {elem.address.suite}{" "}
                      {elem.address.city} {elem.address.zipcode}
                    </span>{" "}
                    <br />
                  </div>
                </div>
              </li>
            )
          )
        ) : (
          <li></li>
        )}
      </ul>
    </div>
  );
};

function mapStateToProps(state: { array_case: any; request: boolean }) {
  return {
    array_users: state.array_case,
    boolean: state.request
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    request: (bool: boolean) => dispatch(request(bool)),
    selectId: (id: number, name: string) => dispatch(changeId(id, name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
