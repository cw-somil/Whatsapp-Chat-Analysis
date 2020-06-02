import React from "react"
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Link,
} from "@react-pdf/renderer"

const ExportDoc = ({ year, months }) => {
  const styles = StyleSheet.create({
    body: {
      padding: 10,
      flexDirection: "column",
    },
    view: {
      width: "100%",
      flexDirection: "row",
      borderRadius: 10,
      marginBottom: 10,
    },
    div1: {
      width: "33%",
      backgroundColor: "#3d5af1",
      padding: 10,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    },
    div2: {
      width: "33%",
      backgroundColor: "#22d1ee",
      padding: 10,
    },
    div3: {
      width: "33%",
      backgroundColor: "#e2f3f5",
      padding: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    div4: {
      width: "33%",
      backgroundColor: "#17b978",
      padding: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    div5: {
      width: "33%",
      backgroundColor: "#a7ff83",
      padding: 10,
    },
    div6: {
      width: "33%",
      backgroundColor: "#f3f169",
      padding: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    header: {
      textAlign: "center",
      marginBottom: 10,
    },

    footer: {
      textAlign: "center",
      position: "absolute",
      bottom: 10,
    },
  })
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header}>Your Whatsapp Report</Text>
        <View style={styles.view}>
          <View style={styles.div1}>
            <Text>Most Popular Year</Text>
          </View>
          <View style={styles.div2}>
            <Text>{year.year}</Text>
          </View>
          <View style={styles.div3}>
            <Text>{year.value} words chatted</Text>
          </View>
        </View>
        {months.map((obj) => (
          <View style={styles.view}>
            <View style={styles.div4}>
              <Text>Most Popular month of {obj.year}</Text>
            </View>
            <View style={styles.div5}>
              <Text>{obj.month}</Text>
            </View>
            <View style={styles.div6}>
              <Text>{obj.value} words chatted</Text>
            </View>
          </View>
        ))}

        <Text style={styles.footer}>
          Thank you for using{" "}
          <Link src="http://watanalysis.herokuapp.com/">Watanalysis</Link>
          {"    "}
          Developed By{" "}
          <Link src="https://www.linkedin.com/in/somil-shah-9761a9138/">
            Somil Shah
          </Link>
        </Text>
      </Page>
    </Document>
  )
}

export default ExportDoc
