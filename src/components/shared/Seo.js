import React from "react";
import Helmet from "react-helmet";

function SEO({ title }) {
  const titleText = title ? `${title} • Enter / Space` : `Enter / Space`;
  return (
    <Helmet>
      <title>{titleText}</title>
    </Helmet>
  )
}

export default SEO;
