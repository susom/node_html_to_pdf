gcloud functions deploy htmltopdf \
--gen2 \
--region=us-west1 \
--runtime=nodejs16 \
--source=. \
--entry-point=app \
--trigger-http \
--memory=1024MB