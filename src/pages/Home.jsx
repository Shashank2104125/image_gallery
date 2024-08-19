import ImageGallery from "../components/ImageGallery"
import Navbar from "../components/Navbar"
import UploadForm from "../components/UploadForm"
const Home = () => {
  return (
    <div>
    <Navbar/>
    <UploadForm/>
    <ImageGallery/>
    </div>
  )
}

export default Home
