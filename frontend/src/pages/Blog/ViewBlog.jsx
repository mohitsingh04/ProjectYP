import React from "react";
import blogBanner from "../../img/blog-banner.jpg";
import user from "../../img/user/user.jpg";
import blog1 from "../../img/blog/blog-01.jpg";
import icon22 from "../../img/icon/icon-22.svg";
import icon23 from "../../img/icon/icon-23.svg";

export default function ViewBlog() {
  return (
    <>
      <div class="breadcrumb-bar">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-12">
              <div class="breadcrumb-list">
                <nav aria-label="breadcrumb" class="page-breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">
                      Pages
                    </li>
                    <li class="breadcrumb-item" aria-current="page">
                      Blog Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <section class="course-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-9 col-md-12">
              <div class="blog">
                <div class="blog-image">
                  <a href="blog-details.html">
                    <img class="img-fluid" src={blogBanner} alt="Post Image" />
                  </a>
                </div>
                <div class="blog-info clearfix">
                  <div class="post-left">
                    <ul>
                      <li>
                        <div class="post-author">
                          <a href="instructor-profile.html">
                            <img src={user} alt="Post Author" />{" "}
                            <span>Ruby Perrin</span>
                          </a>
                        </div>
                      </li>
                      <li>
                        <img class="img-fluid" src={icon22} alt="Img" />
                        April 20, 2024
                      </li>
                      <li>
                        <img class="img-fluid" src={icon23} alt="Img" />
                        Programming, Web Design
                      </li>
                    </ul>
                  </div>
                </div>
                <h3 class="blog-title">
                  <a href="blog-details.html">
                    Learn Webs Applications Development from Experts
                  </a>
                </h3>
                <div class="blog-content">
                  <p>
                    When working on a new piece of software, it’s essential to
                    craft a software design document to create a clear and
                    precise vision of the client’s problem and your proposed
                    solution. Software design documents are important for
                    detailing expectations between the software engineer and the
                    client. They help to streamline the coding process before
                    any code is written.
                  </p>
                  <p>
                    Read on to learn how to write great software design
                    documents that improve communication between you and your
                    client, ensuring that everyone is on the same page when
                    working on a project together.
                  </p>
                  <h4>What Is a Software Design Document?</h4>
                  <p>
                    Before starting a new project with the client, the planning
                    stage involves having a clear vision and agreeing upon
                    design goals. These goals should be laid out in a technical
                    specification document called a software design document.
                  </p>
                  <p>
                    A software developer is usually responsible for creating the
                    software design document. The developer will gather
                    information from a client who wants a new piece of software
                    built and then they will make a document that details the
                    proposed solutions to the client's problems.
                  </p>
                  <h4>What to Include in Your Software Design Document</h4>
                  <p>
                    Problems within the coding world tend to vary, and
                    engineering teams and developers often write design
                    documents differently. However, there is a certain software
                    design document template that you can follow to help you
                    include all of the essential pieces of information.
                  </p>
                  <p>Here are some factors you should include:</p>
                  <p>
                    <strong>Key information:</strong> The title of the document,
                    who’s working on the project, and the date the document was
                    last updated.
                  </p>
                  <p>
                    <strong>Overview:</strong> A complete high-level summary of
                    the project that helps the company decide if they should
                    continue reading the rest of the document.
                  </p>
                  <p>
                    <strong>Pain points:</strong> A complete description of the
                    problems and challenges, alongside why this project is
                    important. Furthermore, it’s essential to include how it
                    fits in with product and technical strategies.
                  </p>
                  <p>
                    <strong>Goals:</strong> Accurately describe the users of the
                    project and their impact. In certain cases, the users may be
                    another engineering team. It’s also important to be clear on
                    how to measure the success of metrics in conjunction with
                    goals and which KPIs will be used to track success. Lastly,
                    it’s essential to state which problems you won’t be fixing
                    so that everyone who has read the document understands what
                    you will and will not be working on.
                  </p>
                  <p>
                    <strong>Project milestones:</strong> Milestones in any
                    project serve as a list of measurable checkpoints, helping
                    to break the entire project down into small parts. A
                    timeline and milestones can be used internally to help keep
                    engineers on track and show the client how the project will
                    progress towards completion.
                  </p>
                  <p>
                    <strong>Prioritization:</strong> After breaking the project
                    down into smaller features, it’s good to rank them in order
                    of priority. The simplest way to do this is to plot each
                    feature in the project onto a prioritization matrix based on
                    urgency and impact.
                  </p>
                  <p>
                    <strong>Solutions:</strong> Detail the current and proposed
                    solutions to the client’s problem. In this section, you’ll
                    want to include what the existing solution is (if any) and
                    how users interact with that solution. The second part of
                    this section is to outline your proposed solution in as much
                    detail as possible. It must be easy to understand—another
                    engineer should be able to read and build your proposed
                    solution without any prior knowledge of the project.
                  </p>
                  <h4>How to Create a Software Design Document</h4>
                  <p>
                    Keeping the above criteria in mind when creating your
                    software design document is a great start. To really
                    maximize efficiency and communication, there are a few best
                    practices to implement.
                  </p>
                  <p>
                    Firstly, keep your language as simple as possible. The key
                    is clarity — especially when it comes to detailing technical
                    points. Include visuals into your document, helping readers
                    accurately understand the points and data you’re trying to
                    convey. Diagrams, charts, and other timelines are a great
                    way to communicate information.
                  </p>
                  <p>
                    Send a draft of your document to the client, so they can
                    catch parts you may have missed or areas that are unclear
                    and need fleshing out. Lastly, it’s important to update your
                    document as the project progresses, as you and other team
                    members should be consistently referencing the document.
                  </p>
                  <p>
                    When working on a new piece of software, it’s essential to
                    craft a software design document to create a clear and
                    precise vision of the client’s problem and your proposed
                    solution. Software design documents are important for
                    detailing expectations between the software engineer and the
                    client. They help to streamline the coding process before
                    any code is written.
                  </p>
                  <p class="mb-0">
                    Read on to learn how to write great software design
                    documents that improve communication between you and your
                    client, ensuring that everyone is on the same page when
                    working on a project together.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-12 sidebar-right theiaStickySidebar">
              <div class="card search-widget blog-search blog-widget">
                <div class="card-body">
                  <form class="search-form">
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="Search..."
                        class="form-control"
                        id="search"
                      />
                      <button type="submit" class="btn btn-primary">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card post-widget blog-widget">
                <div class="card-header">
                  <h4 class="card-title">Recent Posts</h4>
                </div>
                <div class="card-body">
                  <ul class="latest-posts">
                    <li>
                      <div class="post-thumb">
                        <a href="blog-details.html">
                          <img class="img-fluid" src={blog1} alt="Img" />
                        </a>
                      </div>
                      <div class="post-info">
                        <h4>
                          <a href="blog-details.html">
                            Learn Webs Applications Development from Experts
                          </a>
                        </h4>
                        <p>
                          <img class="img-fluid" src={icon22} alt="Img" />
                          Jun 14, 2024
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="post-thumb">
                        <a href="blog-details.html">
                          <img class="img-fluid" src={blog1} alt="Img" />
                        </a>
                      </div>
                      <div class="post-info">
                        <h4>
                          <a href="blog-details.html">
                            Expand Your Career Opportunities With Python
                          </a>
                        </h4>
                        <p>
                          <img class="img-fluid" src={icon22} alt="Img" /> 3 Dec
                          2019
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="post-thumb">
                        <a href="blog-details.html">
                          <img class="img-fluid" src={blog1} alt="Img" />
                        </a>
                      </div>
                      <div class="post-info">
                        <h4>
                          <a href="blog-details.html">
                            Complete PHP Programming Career Guideline
                          </a>
                        </h4>
                        <p>
                          <img class="img-fluid" src={icon22} alt="Img" /> 3 Dec
                          2019
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card category-widget blog-widget">
                <div class="card-header">
                  <h4 class="card-title">Categories</h4>
                </div>
                <div class="card-body">
                  <ul class="categories">
                    <li>
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i> Business{" "}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i> Courses{" "}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i> Education{" "}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i> Graphics Design
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i> Programming
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i> Web Design{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card category-widget blog-widget">
                <div class="card-header">
                  <h4 class="card-title">Archives</h4>
                </div>
                <div class="card-body">
                  <ul class="categories">
                    <li>
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i> January 2024
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i> February 2024
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i class="fas fa-angle-right"></i> April 2024{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card tags-widget blog-widget tags-card">
                <div class="card-header">
                  <h4 class="card-title">Latest Tags</h4>
                </div>
                <div class="card-body">
                  <ul class="tags">
                    <li>
                      <a href="javascript:void(0);" class="tag">
                        HTML
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="tag">
                        Java Script
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="tag">
                        Css
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="tag">
                        Jquery
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="tag">
                        Java
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="tag">
                        React
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
