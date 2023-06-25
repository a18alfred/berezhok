export const resetTemplateEmail = (email_link: string) => (`<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8' />
    <meta http-equiv='x-ua-compatible' content='ie=edge' />
    <title>Бережок - Подтвердите почту</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <style type='text/css'>
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
              format('woff');
        }

        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
              format('woff');
        }
      }

      body,
      a {
        -ms-text-size-adjust: 100%;
        /* 1 */
        -webkit-text-size-adjust: 100%;
        /* 2 */
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }

      body {
      color: black;
        font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      a {
         text-decoration: none;
        color: #1a82e2;
      }

      img {
        width: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
    </style>
  </head>

  <body style='background-color: white'>
    <!-- start preheader -->
    <div
      class='preheader'
      style='
        display: none;
        max-width: 0;
        max-height: 0;
        overflow: hidden;
        font-size: 1px;
        line-height: 1px;
        color: #fff;
        opacity: 0;
      '
    >
      Бережок - Подтвердите почту
    </div>
    <!-- end preheader -->

    <div>        
         <p style='color: black;'>
          Здравствуйте.
        </p>
        
         <p style='margin: 16px 0; color: black;'>
          Перейдите по ссылке и придумайте себе новый пароль.
        </p>
         
         <a
            href='${email_link}'
            target='_blank'
            style='
              background: #fe375d;
              display: inline-block;
              padding: 16px 36px;
              font-size: 16px;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
            '
            >Восстановить пароль
          </a>
 
    </div>
  </body>
</html>
`);