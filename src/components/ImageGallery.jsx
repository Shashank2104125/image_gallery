import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useFirestore from '../hooks/useFirestore';
import {CardActionArea} from '@mui/material';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


const ImageGallery = () => {
const  { docs:images,isLoading } =useFirestore("images");
if(isLoading){
 return (
 <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
  <LinearProgress color="secondary" />
  <LinearProgress color="success" />
  <LinearProgress color="inherit" />
</Stack>
 )
}

  return (
    <div className='grid md:grid-cols-3 justify-center gap-4 mt-10'>
    {images.map((image)=>(
      <Card key={image.imageUrl} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image.imageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">Created On:{image.createdAt.toLocaleDateString()}</Typography>
          <Typography variant="body2" color="text.secondary">Uploaded By: {image.userEmail}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    ))}
    </div>
);
}

export default ImageGallery
