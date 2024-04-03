import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../services/courses.service";
import universityLogo from "../../assets/university-logo.jpg";
import courseBanner from "../../assets/education.jpg";
import { educationToString } from "../../types";
import UserAvatar from "../../components/UserAvatar";
import Enrollments from "./Enrollments";

const CoursePage = () => {
  const courseId = useParams().id;

  const navigate = useNavigate();

  const { data: course, isLoading } = useGetCourseByIdQuery(Number(courseId), {
    skip: !courseId,
  });

  if (!courseId) return null;

  if (isLoading || !course) return <div>Loading...</div>;

  return (
    <Container>
      <Paper square={false} sx={{ overflow: "hidden", mb: 2 }}>
        <img
          src={course.banner || courseBanner}
          width="100%"
          height="250px"
          style={{ overflow: "hidden", objectFit: "cover" }}
        />

        <Stack direction="row" sx={{ alignItems: "center", p: 2 }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            {course.title}
          </Typography>

          <Link
            component={RouterLink}
            to={`/universities/${course.university.id}`}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>{course.university.name}</Typography>
              <Avatar src={course.university.logo || universityLogo} />
            </Stack>
          </Link>
        </Stack>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Typography variant="h5">Description</Typography>
          <Typography>{course.description}</Typography>
          <Typography>
            Difficulty: <b>{course.difficulty}</b>
          </Typography>
        </Box>

        <Box sx={{ p: 2, float: "right" }}>
          <Card sx={{ width: "fit-content" }} elevation={5} square={false}>
            <CardActionArea
              sx={{ p: 1 }}
              onClick={() => navigate(`/users/${course.instructor.id}`)}
            >
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <UserAvatar user={course.instructor} />

                <Box sx={{ ml: 1 }}>
                  <Typography>
                    {course.instructor.name},{" "}
                    {educationToString(course.instructor.education!)}
                  </Typography>
                  <Typography fontSize={13}>
                    {course.university.name}
                  </Typography>
                </Box>
              </Stack>
            </CardActionArea>
          </Card>
        </Box>
      </Paper>

      <Enrollments course={course} />
    </Container>
  );
};

export default CoursePage;