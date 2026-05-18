import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactConfirmationProps {
  name: string;
  subject: string;
  message: string;
}

export default function ContactConfirmationEmail({
  name,
  subject,
  message,
}: ContactConfirmationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Coutellerie Per — votre message a bien été reçu</Preview>
      <Body
        style={{
          backgroundColor: "#f5efe6",
          fontFamily: "Inter, system-ui, sans-serif",
          color: "#1a1410",
        }}
      >
        <Container style={{ margin: "0 auto", padding: "40px 24px", maxWidth: 560 }}>
          <Text
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#b8722f",
              margin: 0,
            }}
          >
            Coutellerie Per · Vannes
          </Text>
          <Heading
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 26,
              color: "#1a1410",
              margin: "12px 0 24px",
              fontWeight: 500,
            }}
          >
            Merci pour votre message, {name}.
          </Heading>

          <Text style={{ fontSize: 16, lineHeight: 1.65 }}>
            Nous avons bien reçu votre demande et vous répondrons sous deux à trois
            jours ouvrés. Pour toute question urgente, n'hésitez pas à appeler
            directement l'atelier.
          </Text>

          <Section
            style={{
              backgroundColor: "#ffffff",
              padding: 24,
              borderRadius: 4,
              border: "1px solid #d9cdba",
              marginTop: 24,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6b5d52",
                margin: 0,
              }}
            >
              Récapitulatif
            </Text>
            <Heading
              as="h2"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 18,
                color: "#1a1410",
                margin: "8px 0 12px",
                fontWeight: 500,
              }}
            >
              {subject}
            </Heading>
            <Hr style={{ borderColor: "#ede4d3", margin: "12px 0" }} />
            <Text
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                fontSize: 14,
                lineHeight: 1.65,
                color: "#2a221c",
              }}
            >
              {message}
            </Text>
          </Section>

          <Text style={{ fontSize: 14, lineHeight: 1.65, marginTop: 24 }}>
            À très bientôt,
            <br />
            <em style={{ fontFamily: "Georgia, serif" }}>P. et G. Chémereau</em>
            <br />
            Coutellerie Per — Vannes
          </Text>

          <Text style={{ color: "#6b5d52", fontSize: 12, marginTop: 24 }}>
            Email automatique de confirmation. Vous pouvez répondre à ce message,
            nous le recevrons directement.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
