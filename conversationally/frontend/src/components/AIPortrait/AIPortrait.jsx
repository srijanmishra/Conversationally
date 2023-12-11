import "./AIPortrait.scss";

const AIPortrait = (props) => {
  console.log(props)
  return (
    <img src={props.avatarSrc} className={`AIPortrait AIPortrait-${props.status}`} style={{height: props.size }}/>
  );
};

export default AIPortrait;
