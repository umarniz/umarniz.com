import sys
import json
import os, os.path
from datetime import datetime, timezone
import zoneinfo
import shutil
import pathlib
from openai import OpenAI

if len(sys.argv) < 3:
    print("Usage: python convert_polar_steps.py <path to trip.json> <openai_token")
    sys.exit(1)

file_path = sys.argv[1]
openai_token = sys.argv[2]

output_path = 'output'

openai_client = OpenAI(api_key=openai_token)

trip_folder_path = os.path.dirname(os.path.abspath(file_path))

try:
    f = open(file_path)
    data = json.load(f)
    f.close()
except e:
    print('Error', e)

def create_markdown_file(step_output_path, step_slug, title, date, location, lat, lon, series, summary, post, topics, read_time):

    # Create folder
    try:
        pathlib.Path(step_output_path).mkdir(parents=True, exist_ok=True)
    except OSError:
        print("start of the directory %s failed" % step_output_path)
    else:
        print("Successfully created the directory %s" % step_output_path)

    # Create index.md
    index_file = open(step_output_path + '/' + title.lower() + '.md', 'w')
    index_file.write('---\n')
    index_file.write('slug: ' + step_slug + '\n')
    index_file.write('date: ' + date.strftime('%Y-%m-%dT%H:%M:%S.%fZ') + '\n')
    index_file.write('title: ' + title + '\n')
    index_file.write('template: "journal"\n')
    index_file.write('location: ' + location + '\n')
    index_file.write('lat: ' + str(lat) + '\n')
    index_file.write('lon: ' + str(lon) + '\n')
    index_file.write('series: ' + series + '\n')
    index_file.write('summary: ' + summary + '\n')
    index_file.write('read_time: ' + str(read_time) + '\n')

    if len(topics) > 0:
        index_file.write('topics:\n')
        for topic in topics:
            index_file.write('  - ' + topic + '\n')
    index_file.write('---\n')
    index_file.write('\n')
    index_file.write(post)
    index_file.close()

    # Create images folder
    # try:
    #     os.mkdir(folder_path + '/images')
    # except OSError:
    #     print("start of the directory %s failed" % folder_path + '/images')
    # else:
    #     print("Successfully created the directory %s" % folder_path + '/images')

trip_name = data['name']
steps = data['all_steps']
for step in steps:
    id = step['id']
    slug = step['slug']

    step_folder_path = slug + '_' + str(id)

    title = step['name']
    description = step['description']

    location_name = step['location']['name'] + ', ' + step['location']['detail']

    start_timestamp = step['start_time']
    timezone_id = step['timezone_id']

    start_date_time = datetime.fromtimestamp(start_timestamp, tz=zoneinfo.ZoneInfo(timezone_id))

    # Markdown path
    step_slug = start_date_time.strftime('%Y-%m-%d') + '-' + title

    step_output_path = os.path.join(output_path, step_slug)

    if (description == ''):
        print('Skipping', title)
        continue

    response = openai_client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Return a JSON object containing:\n-summary\nSummary of the text in a poetic one sentence that intrigues the user to continue reading the full text\n\n-topics\nOutputs topics that this diary entry talks about (e.g loneliness, emotions)\n\n-read_time\nInteger value: Time to read the entire text in minutes . Text to return this json for:" + description
    }]
    , model='gpt-4o'
    , response_format={ "type": "json_object" })

    print(response)
    gpt_response_json = response.choices[0].message.content
    print(gpt_response_json)
    gpt_response_dict = json.loads(gpt_response_json)
    print(gpt_response_dict)


    print('------' + title + '-----')
    print(location_name)
    print(step_slug)

    # print(start_date_time.strftime('%Y-%m-%d %H:%M:%S %Z%z'))

    photos_path = os.path.join(trip_folder_path, step_folder_path, 'photos')

    count_of_photos = 0
    if os.path.exists(photos_path):
        photos_list = os.listdir(photos_path)
        count_of_photos = len(photos_list)

    # print('Photos Path', photos_path)
    # print('Total Photos', count_of_photos)

    create_markdown_file(step_output_path, step_slug, title, start_date_time, location_name
                        , step['location']['lat'], step['location']['lon']
                        , trip_name, gpt_response_dict['summary'], description, gpt_response_dict['topics'], gpt_response_dict['read_time'])
    
    for file in photos_list:
        src_file_path = os.path.join(trip_folder_path, step_folder_path, 'photos', file)

        new_file_name = file.replace('.jpg.jpg', '.jpg')
        dst_file_path = os.path.join(step_output_path, new_file_name)
        # print(src_file_path)
        # print(dst_file_path)
        shutil.copyfile(src_file_path, dst_file_path)
    
    # break
