import React from 'react';
import AuxaIconSmall from '../../UI/Icons/AuxaIconSmall';
// import Footer from '../components/Footer'


import styled from 'styled-components';

export const Container = styled.div`
  padding: 120px 60px;

  margin-left: 120px;
  margin-right: 120px;

//   background: radial-gradient(circle, rgba(92,39,251,1) 0%, rgba(112,71,247,1) 100%);
//   @media (max-width: 1000px) {
    // padding: 70px 30px;
//   }
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
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
                <Footer.Column>
                        <AuxaIconSmall style={{width:30, height: 22}}/>
                        <Footer.Title></Footer.Title>
                        <Footer.Link href="#">Privacy Policy</Footer.Link>
                        <Footer.Link href="#">Terms of Service</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>ABOUT</Footer.Title>
                        <Footer.Link href="#">Story</Footer.Link>
                        <Footer.Link href="#">Clients</Footer.Link>
                        <Footer.Link href="#">Testimonialas</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>CONTACT</Footer.Title>
                        <Footer.Link href="#">Story</Footer.Link>
                        <Footer.Link href="#">Clients</Footer.Link>
                        <Footer.Link href="#">Testimonialas</Footer.Link>
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