from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import plotly.graph_objects as go
import plotly.io as pio
from typing import List, Optional, Dict
from pydantic import BaseModel

app = FastAPI(title="RuoYi-WMS Data Visualization Service")

# 允许跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChartData(BaseModel):
    x_data: List[str]
    y_data: List[float]
    title: str = "Chart"
    color: str = "#409EFF"
    is_dark: Optional[bool] = False
    palette: Optional[Dict[str, str]] = None

router = APIRouter()

@router.post("/api/charts/bar")
async def generate_bar_chart(data: ChartData):
    """
    生成交互式柱状图 (Plotly HTML)
    """
    fig = go.Figure(data=[go.Bar(
        x=data.x_data, 
        y=data.y_data,
        marker_color=data.color
    )])
    
    template = "plotly_dark" if data.is_dark else "plotly_white"
    layout_kwargs = dict(
        title=data.title,
        template=template,
        margin=dict(l=20, r=20, t=40, b=20),
        autosize=True,
    )
    if data.palette:
        layout_kwargs.update({
            "paper_bgcolor": data.palette.get("bgPage", None),
            "plot_bgcolor": data.palette.get("bgContainer", None),
            "font": {"color": data.palette.get("textPrimary", None)}
        })
    fig.update_layout(**layout_kwargs)
    
    # 生成 HTML 片段 (包含 js 依赖)
    # include_plotlyjs='cdn' 可以减小体积，但需要外网访问
    # full_html=False 仅生成 div 片段
    html_content = pio.to_html(fig, full_html=False, include_plotlyjs='cdn', config={'responsive': True})
    
    return {"html": html_content}

@router.post("/api/charts/line")
async def generate_line_chart(data: ChartData):
    """
    生成交互式折线图 (Plotly HTML)
    """
    fig = go.Figure(data=[go.Scatter(
        x=data.x_data, 
        y=data.y_data,
        mode='lines+markers',
        line=dict(color=data.color)
    )])
    
    template = "plotly_dark" if data.is_dark else "plotly_white"
    layout_kwargs = dict(
        title=data.title,
        template=template,
        margin=dict(l=20, r=20, t=40, b=20),
        autosize=True,
    )
    if data.palette:
        layout_kwargs.update({
            "paper_bgcolor": data.palette.get("bgPage", None),
            "plot_bgcolor": data.palette.get("bgContainer", None),
            "font": {"color": data.palette.get("textPrimary", None)}
        })
    fig.update_layout(**layout_kwargs)
    
    html_content = pio.to_html(fig, full_html=False, include_plotlyjs='cdn', config={'responsive': True})
    
    return {"html": html_content}

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
