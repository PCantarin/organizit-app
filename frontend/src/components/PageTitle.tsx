
interface Props{
    text: string
}

function PageTitle(props: Props) {
  return <h1 style={{fontWeight: 'bold', color: '#4d4d4d'}}>{props.text}</h1>;
}
export default PageTitle;
