const GetQueryParams = (queryObject) => {
  if (!queryObject) return new URLSearchParams("");

  for (var propName in queryObject) {
    if (queryObject[propName] === null || queryObject[propName] === undefined) {
      delete queryObject[propName];
    }
  }

  const params = new URLSearchParams(queryObject);

  return params;
};

export const ListSubmissions = async (apiToken, limit, offset, topic) => {
  //TODO: Add param validation

  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${apiToken}`,
    }),
  };

  const params = GetQueryParams({
    limit: limit,
    offset: offset,
    topic: topic,
  });

  const listSubmissionsResponse = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions?${params}`,
    options
  );
  return await listSubmissionsResponse.json();
};

export const GetSubmission = async (apiToken, submissionId) => {
  //TODO: Add param validation

  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${apiToken}`,
    }),
  };

  const getSubmissionResponse = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/${submissionId}`,
    options
  );
  return await getSubmissionResponse.json();
};

export const CreateSubmission = async (apiToken, submission) => {
  //TODO: Add param validation

  const options = {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${apiToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(submission),
  };

  const createSubmissionResponse = await fetch(
    `${process.env.REACT_APP_API_URL}/submissions`,
    options
  );
  return await createSubmissionResponse.json();
};

export const CreateResponse = async (apiToken, response) => {
  //TODO: Add param validation

  const options = {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${apiToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(response),
  };

  return await fetch(
    `${process.env.REACT_APP_API_URL}/submissions/response`,
    options
  );
};
