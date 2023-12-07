import React, {useEffect, useState} from "react";
import { Typography, Box, Divider, Avatar, TextField, Button, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const useStyles = styled((theme) => ({
  commentContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  commentContent: {
    marginLeft: theme.spacing(2),
  },
}));

const Comment = (props) => {

  const classes = useStyles();
  const comments = props.data;
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleRatingChange = (event, newValue) => {
    setNewRating(newValue);
  };

  
  const handleAddComment = async () => {
    if (newRating === 0 || newComment.trim() === '') {
        // Validation failed if rating is not given or comment is empty
        alert('Please provide both a rating and a comment.');
        return;
    }
    console.log('New Comment:', newComment);
    console.log('Rating:', newRating);

    const token = localStorage.getItem('token');
    const body = {
        star: newRating,
        content: newComment,
        shoe: comments[0].id,
    }
    try{
        const res = await axios.post(
            `http://localhost/assignment/backend/index.php/comments`,body,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },}
        );
        console.log(res.data)
        alert("Thêm thành công")

    }
    catch(error){
        console.error("Error fetching cart:", error);
    }
    setNewComment('');
    setNewRating(0);
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <Box key={index} className={classes.commentContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar alt={comment.author} src={comment.avatar} />
            <Typography variant="subtitle1" className={classes.commentContent}>
              {comment.sender_id}
            </Typography>
          </div>
          <Rating value={comment.star} precision={0.5} disabled />
          <Typography variant="body1" className={classes.commentContent}>
            {comment.content}
          </Typography>
          
          <Divider />
        </Box>
      ))}
      <form style={{width: "100%",margin: "15px 0"}}>
        <TextField
          label="Add a new comment"
          variant="outlined"
          value={newComment}
          onChange={handleInputChange}
          multiline
          rows={5}
          style={{ width: "50%" }}
          size="large"
        />
        <Rating
          className={classes.rating}
          value={newRating}
          precision={1}
          onChange={handleRatingChange}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment} >
          Add Comment
        </Button>
      </form>
      <br/>
    </div>
  );
};

export default Comment;
