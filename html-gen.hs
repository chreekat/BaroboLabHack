{-# LANGUAGE OverloadedStrings #-}

import Prelude
import qualified Prelude as P
import Data.Monoid (mempty)

import Text.Blaze.Html5
import qualified Text.Blaze.Html5 as H
import Text.Blaze.Html5.Attributes
import qualified Text.Blaze.Html5.Attributes as A

import Text.Blaze.Html.Renderer.Pretty (renderHtml)

index :: Html
index = do
    docTypeHtml ! lang "en" $ do
        H.head $ do
            meta ! charset "utf-8"
            meta ! httpEquiv "X-UA-Compatible" ! content "IE=edge"
            H.title "BaroboLab - DEMO"
            meta ! name "description" ! content ""
            meta ! name "viewport" ! content "width=device-width, initial-scale=1"
            --  Place favicon.ico and apple-touch-icon.png in the root directory 
            link ! rel "stylesheet" ! href "css/bootstrap.min.css"
            link ! rel "stylesheet" ! href "css/main.css"
            script ! src "js/vendor/modernizr-2.6.2.min.js" $ mempty
        body $ do
            header $ a ! href "index.html" $ img ! src "img/barobo_logo.png"
            nav $ ol ! class_ "nav nav-stacked nav-pills" $ li ! class_ "active" $ a ! href "index.html" $ "BaroboLab"
            section $ do
                a ! href "holt.html" $ img ! class_ "textbook btn btn-default" ! A.id "holt_img" ! src "img/holt_california.png"
                a ! href "#" $ img ! class_ "textbook btn btn-default disabled" ! src "img/ca_common_core.png"
            script ! src "js/vendor/jquery-1.10.2.min.js" $ mempty
            script ! src "js/vendor/bootstrap.min.js" $ mempty

main = writeFile "html/index.html" $ renderHtml index
