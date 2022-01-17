import { Grid } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./AppLoader.css";


export default function AppLoader() {
  return (
    <div className="app-loader-wrapper">
      <Grid visible={true} color="rgba(34, 34, 34, 0.99)" height={60} width={60} radius={10}/>
    </div>
  );
}