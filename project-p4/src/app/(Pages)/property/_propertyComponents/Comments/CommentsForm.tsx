export default function CommentsForm() {
  return (
    <div className="card comment-sec">
      <div className="card-body">
        <h5 className="subs-title">Post A comment</h5>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="input-block">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-block">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
          <div className="input-block">
            <input
              type="email"
              className="form-control"
              placeholder="Subject"
            />
          </div>
          <div className="input-block">
            <textarea
              rows={4}
              className="form-control"
              placeholder="Your Comments"
            ></textarea>
          </div>
          <div className="submit-section">
            <button className="btn submit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
