import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  ButtonGroup,
  ToggleButton,
  Badge,
} from "react-bootstrap";
import { AuthContext } from "../context";
import { ListSubmissions } from "../utils";
import { submissionTopics } from "../consts";

function Admin() {
  const { getAuthToken } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ limit: 9, offset: 0, topic: null });
  const [submissions, setSubmissions] = useState([]);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setSubmissionCount(0);
    setSubmissions([]);

    getAuthToken()
      .then((apiToken) => {
        ListSubmissions(apiToken, filters.limit, filters.offset, filters.topic)
          .then((data) => {
            setSubmissionCount(data.count);
            setSubmissions(data.items);
            setLoading(false);
          })
          .catch(setError);
      })
      .catch(setError);
  }, [filters]);

  const SubmissionFilter = () => {
    return (
      <ButtonGroup className="mb-4">
        {[1, 2, 3, 4, 5].map((value) => {
          return (
            <ToggleButton
              key={value}
              id={`topic-filter-${value}`}
              type="checkbox"
              variant={filters.topic === value ? "primary" : "outline-primary"}
              checked={filters.topic === value}
              value={value}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  topic: filters.topic === value ? null : value,
                })
              }
            >
              {submissionTopics[value]}
            </ToggleButton>
          );
        })}
      </ButtonGroup>
    );
  };

  const PageContent = () => {
    if (loading) {
      return (
        <div className="text-center">
          <Spinner
            style={{ width: 80, height: 80 }}
            animation="border"
            variant="primary"
          />
        </div>
      );
    }

    if (0 >= submissionCount && 0 >= submissions.length) {
      return (
        <div className="text-center">
          <p className="fs-4">No submissions to display</p>
        </div>
      );
    }

    return (
      <>
        <Row xs={2} md={3} className="g-4">
          {submissions.map((submission) => (
            <Col key={submission.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{submission.subject}</Card.Title>
                  <Badge bg="secondary">
                    {submissionTopics[submission.topic]}
                  </Badge>
                  <Card.Text>
                    {submission.message.substring(
                      0,
                      Math.min(100, submission.message.length)
                    )}
                  </Card.Text>
                  <Link
                    key={submission.id}
                    to={`/submission/${submission.id}`}
                    role="button"
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {submission.creationDate}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  };

  return (
    <Container>
      <div className="p-4 mb-4 bg-light rounded-3">
        <h1 className="display-8 fw-bold">Admin</h1>
        <p className="col-md-8 fs-8 mb-4">
          View and respond to user submitted questions.
        </p>
        <hr />
        <div className="pt-2">
          <SubmissionFilter />
          <PageContent />
        </div>
      </div>
    </Container>
  );
}

export default Admin;
