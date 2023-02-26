import Head from 'next/head';

const Lorem = () => {
  return (
    <div className="root">
      <Head>
        <title>FoC Art Generator - Lorem Ipsum</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-buttons">
            <button onClick={() => window.location.href = '/'}>
              Home
            </button>
            <button disabled>
              Lorem Ipsum
            </button>
          </div>
          <div className="header-title">
            <h1>Lorem Ipsum</h1>
          </div>
          <div className="header-subtitle">
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          </div>
        </div>
        <div className="output-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula elit eu elit elementum, sit amet rutrum nulla luctus. Morbi id orci bibendum, congue quam vel, vehicula elit. Duis faucibus augue sit amet ex dapibus, at aliquet nisl ultrices. Nunc pretium est quis ante pulvinar eleifend. In auctor quam orci, vel cursus sapien rutrum quis. Nulla malesuada, quam sit amet ultricies mattis, massa libero pharetra augue, sed efficitur libero dolor non sapien. Etiam non augue non nulla laoreet pulvinar. Praesent dignissim eleifend odio vel malesuada. Nulla at diam in ex cursus bibendum. Morbi elementum blandit purus ac scelerisque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lorem;
