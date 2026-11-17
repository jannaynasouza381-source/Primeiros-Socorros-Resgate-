from app import app

def test_home_page():
    client = app.test_client()
    response = client.get("/")
    assert response.status_code == 200
    assert "Primeiros Socorros" in response.get_data(as_text=True)

def test_activities_page():
    client = app.test_client()
    response = client.get("/atividades")
    assert response.status_code == 200
    assert "Minhas atividades" in response.get_data(as_text=True)
