import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import { useEffect, useState } from "react";
import { fetchPexelsImage } from "../api/Pexels";

const LeadDetails = (payload) => {
  const [imageMedia, setImageMedia] = useState(null);
  useEffect(() => {
    setImageMedia(null);
    if (payload?.lead) {
      const keywords =
        `${payload?.lead?.name} ` +
        `${payload?.lead?.ownerName} ` +
        `${payload?.lead?.type}`.replaceAll(" ", "+");
      fetchPexelsImage(keywords).then((result) => {
        setImageMedia(result);
      });
    }
  }, [payload?.lead]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 372,
        marginLeft: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {!payload?.lead || !imageMedia ? (
        <CircularProgress size={80} sx={{ alignSelf: "center" }} />
      ) : (
        <>
          <CardMedia component="img" height="140" image={imageMedia} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {payload?.lead?.name}
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary={payload?.lead?.name} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={payload?.lead?.ownerName} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={payload?.lead?.type} />
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => payload.hideLeadDetails()}
            >
              Nascondi
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default LeadDetails;
