import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { University } from "../../types";
import { useNavigate } from "react-router-dom";
import universityLogo from "../../assets/university-logo.jpg";
import { DeleteForeverOutlined, Edit } from "@mui/icons-material";

const UniversityItem = ({ university }: { university: University }) => {
  const navigate = useNavigate();

  return (
    <Card square={false} elevation={5}>
      <Stack>
        <CardActionArea
          sx={{ p: 2 }}
          onClick={() => navigate(`/universities/${university.id}`)}
        >
          <Stack direction="row">
            <Avatar
              sx={{ height: 80, width: 80, mr: 2 }}
              src={university.logo || universityLogo}
            />

            <Container>
              <Typography
                sx={{ textDecoration: "none" }}
                variant="h5"
                color="inherit"
              >
                {university.name}
              </Typography>
              <Typography>Founded in {university.year}</Typography>
              <Typography>
                Member since {new Date(university.joined).toLocaleDateString()}
              </Typography>
              <Link component="a" href={university.url}>
                {university.url}
              </Link>
            </Container>
          </Stack>
        </CardActionArea>

        <Divider />

        <Container sx={{ p: 1 }}>
          <Button
            color="error"
            sx={{ float: "right" }}
            startIcon={<DeleteForeverOutlined />}
          >
            Delete
          </Button>
          <Button
            sx={{ float: "right" }}
            onClick={() => navigate(`/universities/${university.id}/edit`)}
            startIcon={<Edit />}
          >
            Edit
          </Button>
        </Container>
      </Stack>
    </Card>
  );
};

export default UniversityItem;
