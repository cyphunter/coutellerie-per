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

interface ContactNotificationProps {
  name: string;
  email: string;
  phone?: string;
  categoryLabel: string;
  subject: string;
  message: string;
  /** Date ISO (à formater côté template pour lisibilité). */
  receivedAt: string;
}

export default function ContactNotificationEmail({
  name,
  email,
  phone,
  categoryLabel,
  subject,
  message,
  receivedAt,
}: ContactNotificationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouvelle demande — {subject}</Preview>
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
            Nouvelle demande de contact
          </Heading>

          <Section
            style={{
              backgroundColor: "#ffffff",
              padding: 24,
              borderRadius: 4,
              border: "1px solid #d9cdba",
            }}
          >
            <Text style={{ margin: "6px 0", fontSize: 14 }}>
              <strong>Type :</strong> {categoryLabel}
            </Text>
            <Text style={{ margin: "6px 0", fontSize: 14 }}>
              <strong>Sujet :</strong> {subject}
            </Text>
            <Hr style={{ borderColor: "#ede4d3", margin: "16px 0" }} />
            <Text style={{ margin: "6px 0", fontSize: 14 }}>
              <strong>De :</strong> {name}
            </Text>
            <Text style={{ margin: "6px 0", fontSize: 14 }}>
              <strong>Email :</strong> {email}
            </Text>
            {phone ? (
              <Text style={{ margin: "6px 0", fontSize: 14 }}>
                <strong>Téléphone :</strong> {phone}
              </Text>
            ) : null}
            <Hr style={{ borderColor: "#ede4d3", margin: "16px 0" }} />
            <Text style={{ margin: "12px 0", whiteSpace: "pre-wrap", fontSize: 15, lineHeight: 1.65 }}>
              {message}
            </Text>
          </Section>

          <Text style={{ color: "#6b5d52", fontSize: 12, marginTop: 24 }}>
            Reçue le {receivedAt}. Vous pouvez répondre directement à cet email pour
            écrire à {name}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
