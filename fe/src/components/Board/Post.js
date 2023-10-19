import React from "react";
import { Link, useLocation } from "react-router-dom";

const Post = () => {
  const { state: data } = useLocation();
  // const json_data = JSON.parse(data);
  // console.log();
  return (
    <div>
      <table>
        <thead>
        <tr>
          <th>no.{data.post_id}</th>
          <th>
            <h2>{data.post_title}</h2>
          </th>
        </tr>
        <tr>
          <th>작성자: {data.user_name}</th>
        </tr>
        <tr>
          <td>{data.post_date}</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <h3>{data.post_body}</h3>
          </td>
        </tr>
        <tr>
          <td>
            <Link to={"/board"}>
              <button>목록</button>
            </Link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Post;
