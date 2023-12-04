import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import {
  Typography,
  Box,
  Divider,
  Avatar,
  TextField,
  Button,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = styled((theme) => ({
  commentContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  commentContent: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Comments() {
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState([]);
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDEyNzgzNzAsInVzZXJfbmFtZSI6ImpvaG5kb2UiLCJ1c2VyX2lkIjoxLCJyb2xlIjoiYWRtaW4ifQ.KJzBWA-T3YI3fJPXNx0w5Iv9NyQUGXHqcG9uZ3acJ_54MlIZ0T0AUc-9e2aZNB7fvRdlwU8U1uMCG2aiXK5JmQ";

  const fetchComment = async (page) => {
    try {
      const res = await axios.get(
        `http://localhost/assignment/backend/index.php/comments?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComment(res.data.data.comments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComment(1);
  });

  return loading === true ? (
    <Loader />
  ) : (
    <div style={{ backgroundColor: "white" }}>
      <h1> Quản lý đánh giá</h1>
      <br />
      {comment.map((comment, index) => (
        <Box key={index}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar alt={comment.author} src={comment.avatar} />
            <Typography variant="subtitle1" style={{ marginRight: "10px" }}>
              {comment.sender_id}
            </Typography>
            <Typography variant="subtitle1">{comment.create_at}</Typography>
          </div>
          <Link to={`/product/detail/${comment.shoe_id}`}>
            <Typography variant="body1">{comment.shoe_name}</Typography>
          </Link>

          <Rating value={comment.star} precision={0.5} disabled />
          <Typography variant="body1">{comment.content}</Typography>

          <Divider />
        </Box>
      ))}
    </div>
  );
}
