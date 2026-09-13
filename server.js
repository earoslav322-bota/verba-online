,'bad');
          io.to(p.id).emit('me',pub(p));
        } else {
          const r = players.get(c.receiverId);
          if(r)r.currentCall=null;
          p.currentCall=null; calls.delete(c.callId);
          io.to(p.id).emit('callEnded',{callId:c.callId,reason:'no_money'});
          io.to(c.receiverId).emit('callEnded',{callId:c.callId,reason:'no_money'});
        }
      }
    }
    if(p.hp<=0){ io.to(p.id).emit('dead'); }
  }
  castPlayers();
}, 1000);

setInterval(()=>{
  io.emit('positions',[...players.values()].map(p=>({
    id:p.id,name:p.name,pos:p.pos,angle:p.angle,color:p.color,activeCar:p.activeCar,
    hp:p.hp,hunger:p.hunger,tuning:p.tuning
  })));
},100);

setInterval(()=>{
  if(Math.random()<0.6) spawnEvent();
  const now = Date.now();
  activeEvents = activeEvents.filter(e=>now-e.createdAt<180000);
  castEvents();
},15000);

app.get('/health',(req,res)=>res.status(200).send('OK'));
setInterval(()=>{
  const url = process.env.RENDER_EXTERNAL_URL || 