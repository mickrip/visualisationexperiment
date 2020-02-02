import styled from "styled-components";

export default styled.div`
  .grid-container {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas: "Header" "Content";
  }

  .Content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "three Graphs";
    grid-area: Content;
  }

  .three {
    grid-area: three;
  }

  .Graphs {
    grid-area: Graphs;
  }

  .Header {
    background-color: #4c746f;
    grid-area: Header;
    padding-left: 20px;
    h1 {
      color: white;
      font-weight: normal;
      padding: 0;
      margin: 0;
      font-size: 18px;
      line-height: 60px;
    }
  }
`;
