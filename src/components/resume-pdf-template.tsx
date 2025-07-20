import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: '1 solid #000000',
    paddingBottom: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 80,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 4,
  },
  tableColWide: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 4,
  },
  tableCell: {
    fontSize: 9,
  },
  textArea: {
    border: '1 solid #000000',
    padding: 8,
    minHeight: 60,
    fontSize: 9,
    lineHeight: 1.4,
  },
});

interface ResumePDFTemplateProps {
  data: ResumeData;
}

export const ResumePDFTemplate: React.FC<ResumePDFTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>履歴書</Text>
      
      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>個人情報</Text>
        <View style={styles.row}>
          <Text style={styles.label}>氏名:</Text>
          <Text style={styles.value}>{data.personalInfo.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>フリガナ:</Text>
          <Text style={styles.value}>{data.personalInfo.nameKana}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>生年月日:</Text>
          <Text style={styles.value}>{data.personalInfo.birthDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>性別:</Text>
          <Text style={styles.value}>
            {data.personalInfo.gender === 'male' ? '男性' : 
             data.personalInfo.gender === 'female' ? '女性' : ''}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>住所:</Text>
          <Text style={styles.value}>{data.personalInfo.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>電話番号:</Text>
          <Text style={styles.value}>{data.personalInfo.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>メール:</Text>
          <Text style={styles.value}>{data.personalInfo.email}</Text>
        </View>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>学歴</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>年月</Text>
            </View>
            <View style={styles.tableColWide}>
              <Text style={styles.tableCell}>学校名・学部・学科</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>卒業・在学</Text>
            </View>
          </View>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{edu.date}</Text>
              </View>
              <View style={styles.tableColWide}>
                <Text style={styles.tableCell}>
                  {edu.institution}
                  {edu.department && ` ${edu.department}`}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {edu.status === 'graduated' ? '卒業' :
                   edu.status === 'enrolled' ? '在学中' : '中退'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Work Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>職歴</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>年月</Text>
            </View>
            <View style={styles.tableColWide}>
              <Text style={styles.tableCell}>会社名・職種</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>在職・退職</Text>
            </View>
          </View>
          {data.workExperience.map((work) => (
            <View key={work.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {work.startDate}
                  {work.endDate && ` - ${work.endDate}`}
                </Text>
              </View>
              <View style={styles.tableColWide}>
                <Text style={styles.tableCell}>
                  {work.company} - {work.position}
                  {work.description && `\n${work.description}`}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {work.status === 'current' ? '在職中' : '退職'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Qualifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>資格・免許</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>年月</Text>
            </View>
            <View style={styles.tableColWide}>
              <Text style={styles.tableCell}>資格・免許名</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>発行機関</Text>
            </View>
          </View>
          {data.qualifications.map((qual) => (
            <View key={qual.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{qual.date}</Text>
              </View>
              <View style={styles.tableColWide}>
                <Text style={styles.tableCell}>{qual.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{qual.organization || ''}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Motivation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>志望動機</Text>
        <View style={styles.textArea}>
          <Text>{data.motivation}</Text>
        </View>
      </View>

      {/* Self PR */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>自己PR</Text>
        <View style={styles.textArea}>
          <Text>{data.selfPR}</Text>
        </View>
      </View>
    </Page>
  </Document>
);
