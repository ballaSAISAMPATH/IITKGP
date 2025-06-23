import pandas as pd
import numpy as np
import re
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from typing import Dict, List, Tuple
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class AdvancedReviewAnalyzer:
    def __init__(self, csv_path: str):
        """Initialize analyzer with CSV file path."""
        self.df = pd.read_csv(csv_path,encoding="latin-1")
        self.comments = self.df['text'].tolist()
        self.sentiments = self.df['Sentiment'].tolist()

        self.tfidf = TfidfVectorizer(
            max_features=1000,
            stop_words='english',
            ngram_range=(1, 3), 
            min_df=2,  
            max_df=0.95 
        )

    def _clean_text(self, text: str) -> str:
        """Clean and normalize text."""
        text = str(text).lower()
        text = re.sub(r'[^a-z\s]', '', text)
        text = ' '.join(text.split())
        return text

    def _get_top_tfidf_terms(self, texts: List[str], n_terms: int = 5) -> List[Tuple[str, float]]:
        """Extract top TF-IDF terms from a group of texts."""
        cleaned_texts = [self._clean_text(text) for text in texts]
        
        if len(cleaned_texts) == 1:
            self.tfidf.min_df = 1 
            self.tfidf.max_df = 1.0 
        else:
            min_df_adjusted = min(2, max(1, len(cleaned_texts) - 1))  
            self.tfidf.min_df = min_df_adjusted
            self.tfidf.max_df = 0.95
        
        tfidf_matrix = self.tfidf.fit_transform(cleaned_texts)
        
        feature_names = self.tfidf.get_feature_names_out()
        
        avg_scores = np.mean(tfidf_matrix.toarray(), axis=0)
        
        top_indices = avg_scores.argsort()[-n_terms:][::-1]
        return [(feature_names[i], avg_scores[i]) for i in top_indices]

    def analyze_reviews(self) -> Dict:
        """Perform comprehensive review analysis using TF-IDF."""        
        total_reviews = len(self.comments)
        
        sentiment_groups = {sentiment: [] for sentiment in set(self.sentiments)}
        for comment, sentiment in zip(self.comments, self.sentiments):
            sentiment_groups[sentiment].append(comment)
        
        sentiment_distribution = {
            sentiment: (len(comments) / total_reviews) * 100
            for sentiment, comments in sentiment_groups.items()
        }
        
        sentiment_terms = {}
        for sentiment, comments in sentiment_groups.items():
            sentiment_terms[sentiment] = self._get_top_tfidf_terms(comments)
        
        distinctive_terms = {}
        for target_sentiment in sentiment_groups:
            other_comments = []
            for sent, comments in sentiment_groups.items():
                if sent != target_sentiment:
                    other_comments.extend(comments)
            
            target_terms = self._get_top_tfidf_terms(sentiment_groups[target_sentiment], n_terms=10)
            other_terms = self._get_top_tfidf_terms(other_comments, n_terms=10)
            
            other_term_set = {term for term, _ in other_terms}
            distinctive = [(term, score) for term, score in target_terms 
                         if term not in other_term_set]
            distinctive_terms[target_sentiment] = distinctive[:5]
        
        representative_reviews = {}
        for sentiment, terms in sentiment_terms.items():
            term_words = [term for term, _ in terms]
            best_reviews = []
            
            for comment in sentiment_groups[sentiment]:
                clean_comment = self._clean_text(comment)
                score = sum(1 for term in term_words if term in clean_comment)
                if score > 0:
                    best_reviews.append((score, comment))
            
            best_reviews.sort(reverse=True)
            representative_reviews[sentiment] = [review for _, review in best_reviews[:2]]
        
        return {
            'total_reviews': total_reviews,
            'sentiment_distribution': sentiment_distribution,
            'sentiment_terms': sentiment_terms,
            'distinctive_terms': distinctive_terms,
            'representative_reviews': representative_reviews
        }

    def generate_paragraph_insight(self) -> Dict:
        """Generate a natural paragraph summarizing the insights."""
        analysis = self.analyze_reviews()
        
        sentiment_parts = []
        for sentiment, percentage in analysis['sentiment_distribution'].items():
            sentiment_parts.append(f"{percentage:.1f}% {sentiment.lower()}")
        
        sentiment_terms = {
            sentiment: [term for term, _ in terms[:3]]  # Get top 3 terms
            for sentiment, terms in analysis['sentiment_terms'].items()
        }
        
        insights = []
        
        insights.append(
            f"Based on the analysis of {analysis['total_reviews']} customer reviews,"
            f"the sentiment distribution shows {', '.join(sentiment_parts[:-1])} and"
            f"{sentiment_parts[-1]} feedback."
        )
        
        for sentiment in sentiment_terms.keys():
            terms = sentiment_terms[sentiment]
            if terms:
                if sentiment == "Positive":
                    insights.append(
                        f"Satisfied customers frequently mention terms like"
                        f"\"{terms[0]}\", \"{terms[1]}\", and \"{terms[2]}\","
                        f"highlighting the product's strengths."
                    )
                elif sentiment == "Negative":
                    insights.append(
                        f"Areas for improvement are indicated by terms such as"
                        f"\"{terms[0]}\", \"{terms[1]}\", and \"{terms[2]}\""
                        f"in critical reviews."
                    )
                elif sentiment == "Neutral":
                    insights.append(
                        f"Balanced feedback often includes mentions of"
                        f"\"{terms[0]}\", \"{terms[1]}\", and \"{terms[2]}\","
                        f"suggesting mixed experiences."
                    )
        
        if analysis['representative_reviews']:
            pos_review = analysis['representative_reviews'].get('Positive', [''])[0]
            if pos_review:
                insights.append(
                    f"A typical positive experience is reflected in this review: "
                    f"\"{pos_review[:100]}...\""
                )
            
            neg_review = analysis['representative_reviews'].get('Negative', [''])[0]
            if neg_review:
                insights.append(
                    f"While a representative critical review states: "
                    f"\"{neg_review[:100]}...\""
                )
        
        return {"paragraph_insight": " ".join(insights)}

    def generate_detailed_report(self) -> Dict:
        """Generate detailed insights report."""
        analysis = self.analyze_reviews()
        
        report = {
            "report_title": "📊 Advanced Review Analysis (TF-IDF Based)",
            "total_reviews": analysis['total_reviews'],
            "sentiment_distribution": analysis['sentiment_distribution'],
            "sentiment_terms": analysis['sentiment_terms'],
            "distinctive_terms": analysis['distinctive_terms'],
            "representative_reviews": analysis['representative_reviews']
        }
        
        return report
@app.route('/analyze_reviews/', methods=['POST'])
def analyze_reviews():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        analyzer = AdvancedReviewAnalyzer(filepath)
        
        paragraph_insight = analyzer.generate_paragraph_insight()  # Get paragraph insight
        detailed_report = analyzer.generate_detailed_report()  # Get detailed report

        return jsonify({
            "paragraph_insight": paragraph_insight['paragraph_insight'],
            "detailed_report": detailed_report
        })
    else:
        return jsonify({"error": "Invalid file format. Please upload a CSV file."}), 400

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    app.run(debug=True)