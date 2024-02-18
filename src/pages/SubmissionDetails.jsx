import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Stack,
  Badge,
} from "react-bootstrap";
import { AuthContext } from "../context";
import { CreateResponse, GetSubmission } from "../utils";
import { submissionTopics } from "../consts";

function SubmissionDetails() {
  const { id } = useParams();
  const { getAuthToken, activeAccount } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sendingResponse, setSendingResponse] = useState(false);
  const [submission, setSubmission] = useState(null);

  const loadSubmissionDetails = () => {
    setLoading(true);
    setSubmission(null);

    getAuthToken()
      .then((apiToken) => {
        GetSubmission(apiToken, id)
          .then((data) => {
            setSubmission(data);
            setLoading(false);
          })
          .catch(setError);
      })
      .catch(setError);
  };

  useEffect(() => {
    loadSubmissionDetails();
  }, []);

  const handleReplyFormSubmit = ({ message }) => {
    setSendingResponse(true);

    getAuthToken()
      .then((apiToken) => {
        CreateResponse(apiToken, { submissionId: id, message })
          .then(() => {
            loadSubmissionDetails();
            setSendingResponse(false);
          })
          .catch(setError);
      })
      .catch(setError);
  };

  const MessageContent = ({ content }) => {
    return (
      <>
        <p className="fs-8 mb-2">{content.creationDate}</p>
        <Stack className="fs-8 mb-2" direction="horizontal" gap={2}>
          {content.topic ? (
            <Badge pill bg="secondary">
              {submissionTopics[content.topic]}
            </Badge>
          ) : null}
          {content.createdBy ? (
            <Badge pill bg="secondary">
              Created by: {content.createdBy}
            </Badge>
          ) : null}
        </Stack>
        <p className="fs-8 mb-0">{content.message}</p>
      </>
    );
  };

  const ResponseContent = (response) => {
    const currentUserReply =
      response.createdBy && response.createdBy == activeAccount.name;

    return (
      <div key={response.id} className={currentUserReply ? "pe-5" : "ps-5"}>
        <div
          className={`p-4 mb-4 rounded-3 bg-opacity-25 ${
            currentUserReply ? "text-left bg-info" : "text-right bg-secondary"
          }`}
        >
          <MessageContent content={response} />
        </div>
      </div>
    );
  };

  const PageContent = () => {
    if (loading) {
      return (
        <div className="p-4 mb-4 bg-light rounded-3 text-center">
          <Spinner
            style={{ width: 80, height: 80 }}
            animation="border"
            variant="primary"
          />
        </div>
      );
    }

    return (
      <>
        <div className="p-4 pb-1 mb-4 bg-light rounded-3">
          <h1 className="display-8 fw-bold">{submission.subject}</h1>
          <MessageContent content={submission} />
          <hr className="my-4" />
          <ReplyForm
            onSubmit={handleReplyFormSubmit}
            loading={sendingResponse || loading}
          />
          <hr className="my-4" />
          {0 >= submission.responses.length ? (
            <div className="text-center">
              <p className="fs-4">No responses to display</p>
            </div>
          ) : null}
          {submission.responses.map(ResponseContent)}
        </div>
      </>
    );
  };

  return (
    <Container>
      <PageContent />
    </Container>
  );
}

const ReplyForm = ({ onSubmit, loading }) => {
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const result = { message };

    setMessage("");
    setValidated(false);
    onSubmit(result);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col xs={9}>
            <Form.Control
              required
              as="textarea"
              rows={1}
              id="MessageInput"
              placeholder="Message"
              disabled={loading}
              value={message}
              onChange={(event) => {
                event.preventDefault();
                setMessage(event.target.value);
              }}
            />
          </Col>
          <Col xs={3}>
            <div className="d-grid">
              {loading ? (
                <Button type="button" disabled={loading}>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <Button type="submit">Reply</Button>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SubmissionDetails;
