import React from 'react';
import { Link } from 'react-router-dom'
// import {Card, CardTitle /*, CardActions, CardHeader, CardMedia, CardText*/ } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const ComponentCard = ({ path, title, selected }) => {
  // <CardHeader
  //       title="URL Avatar"
  //       subtitle="Subtitle"
  //       avatar="images/jsa-128.jpg"
  //     />
  //  <CardText>
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //       Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
  //       Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
  //       Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
  //     </CardText>

  const labelStyle = {
    textTransform: "normal"
  }

  const style = {
    margin: 10
  }
  return (
  <Link to={`/${path}`}>
    <RaisedButton label={title} 
      labelStyle={labelStyle}
      style={style}
      primary={selected}
    />
  </Link>
  );
}

export default ComponentCard;