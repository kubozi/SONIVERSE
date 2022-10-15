import React from 'react';
// import Footer from '../components/Footer'


import styled from 'styled-components';

export const Container = styled.div`
  padding: 80px 60px;
//   background: radial-gradient(circle, rgba(92,39,251,1) 0%, rgba(112,71,247,1) 100%);
  @media (max-width: 1000px) {
    padding: 70px 30px 40px 40px;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    /* background: red; */
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Link = styled.a`
  color: grey;
  margin-bottom: 20px;
  font-size: 13px;
  text-decoration: none;
  &:hover {
      color: white;
      transition: 200ms ease-in;

  }
`;

export const Title = styled.p`
  font-size: 17px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;

function Footer( {children, ...restProps} )
{
    return <Container {...restProps}>{children}</Container>
}

Footer.Wrapper = function FooterWrapper({children, ...restProps})
{
    return <Wrapper {...restProps}>{children}</Wrapper>
}

Footer.Row = function FooterRow({children, ...restProps})
{
    return <Row {...restProps}>{children}</Row>
}

Footer.Column = function FooterColumn({children, ...restProps})
{
    return <Column {...restProps}>{children}</Column>
}
Footer.Link = function FooterLink({children, ...restProps})
{
    return <Link {...restProps}>{children}</Link>
}

Footer.Title = function FooterTitle({children, ...restProps})
{
    return <Title {...restProps}>{children}</Title>
}

export function FooterContainer()
{

    function Footer( {children, ...restProps} )
{
    return <Container {...restProps}>{children}</Container>
}

Footer.Wrapper = function FooterWrapper({children, ...restProps})
{
    return <Wrapper {...restProps}>{children}</Wrapper>
}

Footer.Row = function FooterRow({children, ...restProps})
{
    return <Row {...restProps}>{children}</Row>
}

Footer.Column = function FooterColumn({children, ...restProps})
{
    return <Column {...restProps}>{children}</Column>
}
Footer.Link = function FooterLink({children, ...restProps})
{
    return <Link {...restProps}>{children}</Link>
}

Footer.Title = function FooterTitle({children, ...restProps})
{
    return <Title {...restProps}>{children}</Title>
}

    return(
        <Footer>
            <hr></hr>
            <br></br>
            <br></br>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.Column />
                    <Footer.Column>
                        <Footer.Title>ABOUT</Footer.Title>
                        <Footer.Link href="#">Soniverse</Footer.Link>
                        <Footer.Link href="#">Artists</Footer.Link>
                        <Footer.Link href="#">Token</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>SOCIAL</Footer.Title>
                        <Footer.Link href="#">Twitter</Footer.Link>
                        <Footer.Link href="#">Discord</Footer.Link>
                        <Footer.Link href="#">Telegram</Footer.Link>
                    </Footer.Column>
                </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}